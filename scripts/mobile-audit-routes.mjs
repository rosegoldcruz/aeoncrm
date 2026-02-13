import { promises as fs } from "node:fs"
import path from "node:path"

const appDir = path.resolve("app")
const reportPath = path.resolve("mobile-audit-report.json")

const riskyPatterns = [
  {
    id: "fixed-panel-width",
    description: "Fixed side panel width without mobile fallback",
    regex: /fixed[^"\n]*right-0[^"\n]*(?<!sm:)(?<!md:)(?<!lg:)(?<!xl:)w-\[\d+px\]/g,
  },
  {
    id: "hard-min-width",
    description: "Hard min-width that can cause horizontal overflow",
    regex: /(?<!sm:)(?<!md:)(?<!lg:)(?<!xl:)min-w-\[(\d{3,4})px\]/g,
  },
  {
    id: "dense-grid-no-mobile",
    description: "Dense grid without mobile breakpoint fallback",
    regex: /(?<!sm:)(?<!md:)(?<!lg:)(?<!xl:)grid-cols-([5-9])\b/g,
  },
]

const ignoreLineMatchers = [
  /max-w-\[/,
  /grid-cols-1\s+sm:grid-cols-/,
  /min-w-0\s+md:min-w-/,
  /overflow-x-auto/,
  /min-w-\[700px\]/,
  /grid-cols-7/, // intentional calendar layout wrapped in scroll container
]

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return walk(full)
      if (entry.isFile() && /page\.tsx$/.test(entry.name)) return [full]
      return []
    }),
  )
  return files.flat()
}

function getLineNumber(text, index) {
  return text.slice(0, index).split("\n").length
}

function scanFile(filePath, content) {
  const issues = []
  const lines = content.split("\n")

  for (const pattern of riskyPatterns) {
    for (const match of content.matchAll(pattern.regex)) {
      const lineNumber = getLineNumber(content, match.index ?? 0)
      const line = lines[lineNumber - 1] ?? ""

      if (!line.includes("className")) continue
      if (ignoreLineMatchers.some((m) => m.test(line))) continue

      issues.push({
        file: path.relative(process.cwd(), filePath),
        line: lineNumber,
        rule: pattern.id,
        description: pattern.description,
        excerpt: line.trim(),
      })
    }
  }

  return issues
}

async function main() {
  const files = await walk(appDir)
  const issues = []

  for (const file of files) {
    const content = await fs.readFile(file, "utf8")
    issues.push(...scanFile(file, content))
  }

  const report = {
    checkedAt: new Date().toISOString(),
    totalRoutes: files.length,
    issueCount: issues.length,
    issues,
    pass: issues.length === 0,
  }

  await fs.writeFile(reportPath, JSON.stringify(report, null, 2), "utf8")

  console.log(`Checked routes: ${report.totalRoutes}`)
  console.log(`Issues: ${report.issueCount}`)
  console.log(`Report: ${path.relative(process.cwd(), reportPath)}`)

  if (!report.pass) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
