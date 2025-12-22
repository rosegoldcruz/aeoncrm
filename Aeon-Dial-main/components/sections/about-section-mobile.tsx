"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-md mx-auto">
        {/* Header - Simplified for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black mb-6 text-white leading-tight">
            What is AEON Dial?
          </h2>
        </motion.div>

        {/* Main content - Vertical narrative flow */}
        <div className="space-y-8">
          {/* Hero statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-orange-400 mb-4 leading-tight">
              The Complete CRM Operating System
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              AEON Dial is the <span className="text-white font-semibold">Advanced Efficient Optimized Network</span> — a full-stack CRM built specifically for contractors, home service pros, and outbound sales teams.
            </p>
          </motion.div>

          {/* Key differentiator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800"
          >
            <p className="text-lg text-gray-400 leading-relaxed mb-4">
              While GoHighLevel tries to be everything to everyone, we laser-focused on what actually matters:
            </p>
            <p className="text-xl text-orange-400 font-bold leading-relaxed">
              Speed, automation, and results.
            </p>
          </motion.div>

          {/* Value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.2 }}
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              Every feature is designed to eliminate busywork, close more deals, and scale your operation without hiring more people.
            </p>
          </motion.div>

          {/* Key benefits - Vertical stack instead of grid */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.3 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/20"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mt-0.5">
                <span className="text-orange-400 text-lg">⚡</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-orange-400 mb-1">Built for Speed</h4>
                <p className="text-gray-400 leading-relaxed">Sub-second load times. Real-time updates. Zero lag.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.4 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/5 border border-purple-500/20"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mt-0.5">
                <span className="text-purple-400 text-lg">🤖</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-400 mb-1">AI-First Design</h4>
                <p className="text-gray-400 leading-relaxed">Automation that actually works. Intelligence baked into every feature.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: 0.5 }}
              className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/5 border border-blue-500/20"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-0.5">
                <span className="text-blue-400 text-lg">📈</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-400 mb-1">Results-Driven</h4>
                <p className="text-gray-400 leading-relaxed">Track what matters. Optimize what works. Scale what wins.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
