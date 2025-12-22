"use client"

import { CommandHero } from "@/components/hero/command-hero"

export default function HomePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section - Simple, works everywhere */}
      <CommandHero />

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Why AEON Dial?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Calling</h3>
              <p className="text-neutral-400">Intelligent call routing and real-time transcription powered by advanced AI.</p>
            </div>
            <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Automation</h3>
              <p className="text-neutral-400">Automate repetitive tasks and focus on what matters most.</p>
            </div>
            <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-neutral-400">Real-time insights and reporting to optimize your operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-lg text-neutral-400 mb-8">
            Join thousands of teams using AEON Dial to streamline their operations.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors"
          >
            Get Started Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-neutral-800 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-500 mb-4">
            © {new Date().getFullYear()} AEON Dial
          </p>
          <div className="flex justify-center gap-6">
            <a href="/dashboard" className="text-neutral-400 hover:text-white transition-colors">
              Dashboard
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}