#!/usr/bin/env node

const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

const URL = process.env.URL || 'http://localhost:3000'
const OUTPUT_DIR = path.join(process.cwd(), 'lighthouse-reports')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

console.log('🚀 Running Lighthouse Mobile Performance Audit...')
console.log(`📊 Testing URL: ${URL}`)
console.log(`📁 Reports will be saved to: ${OUTPUT_DIR}`)

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const reportPath = path.join(OUTPUT_DIR, `lighthouse-mobile-${timestamp}.html`)

// Run Lighthouse with mobile preset
const lighthouseCommand = `lighthouse ${URL} --output html --output-path ${reportPath} --preset=desktop --quiet`

exec(lighthouseCommand, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Lighthouse audit failed:', error.message)
    process.exit(1)
  }

  if (stderr) {
    console.warn('⚠️  Lighthouse warnings:', stderr)
  }

  console.log('✅ Lighthouse audit completed!')
  console.log(`📄 Report saved to: ${reportPath}`)
  console.log(`🌐 Open the report in your browser to view detailed performance metrics`)

  // Also output key metrics to console
  const reportContent = fs.readFileSync(reportPath, 'utf8')

  // Extract key performance metrics (simplified)
  const performanceMatch = reportContent.match(/Performance.*?>(\d+)/)
  const accessibilityMatch = reportContent.match(/Accessibility.*?>(\d+)/)
  const bestPracticesMatch = reportContent.match(/Best Practices.*?>(\d+)/)
  const seoMatch = reportContent.match(/SEO.*?>(\d+)/)

  console.log('\n📊 Key Metrics:')
  if (performanceMatch) console.log(`⚡ Performance: ${performanceMatch[1]}/100`)
  if (accessibilityMatch) console.log(`♿ Accessibility: ${accessibilityMatch[1]}/100`)
  if (bestPracticesMatch) console.log(`✅ Best Practices: ${bestPracticesMatch[1]}/100`)
  if (seoMatch) console.log(`🔍 SEO: ${seoMatch[1]}/100`)

  console.log('\n💡 Optimization Tips:')
  console.log('- Focus on Performance score > 90')
  console.log('- Eliminate render-blocking resources')
  console.log('- Optimize images and fonts')
  console.log('- Minimize unused JavaScript')
  console.log('- Enable text compression')
})
