"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">
            What is AEON Dial?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-orange-400">The Complete CRM Operating System</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              AEON Dial is the <span className="text-white font-semibold">Advanced Efficient Optimized Network</span> —
              a full-stack CRM built specifically for contractors, home service pros, and outbound sales teams.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              While GoHighLevel tries to be everything to everyone, we laser-focused on what actually matters:
              <span className="text-orange-400 font-semibold"> speed, automation, and results</span>.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Every feature is designed to eliminate busywork, close more deals, and scale your operation without hiring more people.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20">
              <h4 className="text-xl font-bold text-orange-400 mb-2">⚡ Built for Speed</h4>
              <p className="text-gray-400">Sub-second load times. Real-time updates. Zero lag.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
              <h4 className="text-xl font-bold text-purple-400 mb-2">🤖 AI-First Design</h4>
              <p className="text-gray-400">Automation that actually works. Intelligence baked into every feature.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
              <h4 className="text-xl font-bold text-blue-400 mb-2">📈 Results-Driven</h4>
              <p className="text-gray-400">Track what matters. Optimize what works. Scale what wins.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
