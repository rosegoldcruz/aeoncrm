#!/usr/bin/env npx tsx
/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * AEON BOOTSTRAP TEST SUITE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Tests the bootstrap in an isolated environment.
 * Does NOT touch production data.
 */

import { AeonBootstrap, type BootstrapResult } from "./index"

interface TestResult {
  name: string
  passed: boolean
  message: string
  duration: number
}

class BootstrapTester {
  private results: TestResult[] = []

  private async runTest(
    name: string,
    testFn: () => Promise<void>
  ): Promise<void> {
    const start = Date.now()
    try {
      await testFn()
      this.results.push({
        name,
        passed: true,
        message: "OK",
        duration: Date.now() - start,
      })
    } catch (error) {
      this.results.push({
        name,
        passed: false,
        message: error instanceof Error ? error.message : String(error),
        duration: Date.now() - start,
      })
    }
  }

  async testDryRun(): Promise<void> {
    await this.runTest("Dry run mode", async () => {
      const bootstrap = new AeonBootstrap({ dryRun: true, verbose: false })
      const result = await bootstrap.run()
      
      // Dry run should complete without errors
      if (!result.results) {
        throw new Error("No results returned")
      }
    })
  }

  async testCheckOnly(): Promise<void> {
    await this.runTest("Check only mode", async () => {
      const bootstrap = new AeonBootstrap({ checkOnly: true, verbose: false })
      const result = await bootstrap.run()
      
      // Check only should return results
      if (!result.results) {
        throw new Error("No results returned")
      }
    })
  }

  async testResultStructure(): Promise<void> {
    await this.runTest("Result structure", async () => {
      const bootstrap = new AeonBootstrap({ dryRun: true })
      const result = await bootstrap.run()
      
      // Verify result structure
      for (const r of result.results) {
        if (!r.step || !r.status || !r.message) {
          throw new Error(`Invalid result structure: ${JSON.stringify(r)}`)
        }
        if (!["pass", "fail", "skip", "fixed"].includes(r.status)) {
          throw new Error(`Invalid status: ${r.status}`)
        }
      }
    })
  }

  async testIdempotency(): Promise<void> {
    await this.runTest("Idempotency", async () => {
      // Run bootstrap twice with check-only
      const bootstrap1 = new AeonBootstrap({ checkOnly: true })
      const result1 = await bootstrap1.run()

      const bootstrap2 = new AeonBootstrap({ checkOnly: true })
      const result2 = await bootstrap2.run()

      // Results should be consistent
      if (result1.results.length !== result2.results.length) {
        throw new Error("Results not idempotent")
      }
    })
  }

  async run(): Promise<void> {
    console.log("\n═══════════════════════════════════════════════════════════════")
    console.log("  AEON BOOTSTRAP TEST SUITE")
    console.log("═══════════════════════════════════════════════════════════════\n")

    await this.testDryRun()
    await this.testCheckOnly()
    await this.testResultStructure()
    await this.testIdempotency()

    // Summary
    console.log("\n═══════════════════════════════════════════════════════════════")
    console.log("  TEST RESULTS")
    console.log("═══════════════════════════════════════════════════════════════\n")

    const passed = this.results.filter((r) => r.passed)
    const failed = this.results.filter((r) => !r.passed)

    for (const result of this.results) {
      const icon = result.passed ? "✅" : "❌"
      console.log(`${icon} ${result.name} (${result.duration}ms)`)
      if (!result.passed) {
        console.log(`   └─ ${result.message}`)
      }
    }

    console.log(`\n  Total: ${this.results.length} | Passed: ${passed.length} | Failed: ${failed.length}\n`)

    if (failed.length > 0) {
      process.exit(1)
    }
  }
}

// Run tests
const tester = new BootstrapTester()
tester.run().catch(console.error)
