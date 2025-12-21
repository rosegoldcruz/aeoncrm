"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Zap, Target, Brain, Shield, Rocket, TrendingUp } from "lucide-react"
import Link from "next/link"
import { CommandHero } from "@/components/hero/command-hero"
import { useLenis } from "@/hooks/use-lenis"

export default function HomePage() {
  useLenis()

  return (
    <main className="bg-black text-white">
      {/* COMMAND HERO */}
      <CommandHero />

      {/* WHY AEON DIAL */}
      <section id="why-aeon" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Why AEON Dial Destroys the Competition
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              This isn't just another CRM. It's a complete operating system built for teams that demand excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="AI-Powered Automation"
              text="Eliminate manual work. Our AI handles lead routing, follow-ups, and qualification automatically. GoHighLevel wishes they had this."
            />
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Built for Contractors"
              text="Purpose-built for home services, remodeling, and construction. Not a generic tool trying to do everything poorly."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Real-Time Intelligence"
              text="Live dashboards, instant alerts, and predictive analytics. Know what's happening before it happens."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Enterprise Security"
              text="Bank-level security with role-based access, audit logs, and compliance built in. Your data is locked down."
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Lightning Fast"
              text="Built on Next.js 14 and deployed on Vercel's edge network. Sub-100ms response times globally."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Scales With You"
              text="From 1 agent to 1,000. From 10 leads to 10,000. The system grows without breaking."
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
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

      {/* CTA SECTION */}
      <section className="relative py-32 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-orange-950/20 to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-500/10 rounded-full blur-[150px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
            Stop Settling for Less
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Your competitors are still using outdated tools.
          </p>
          <p className="text-xl md:text-2xl text-orange-400 font-bold mb-12">
            You're about to leave them in the dust.
          </p>
          
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all text-xl font-bold shadow-[0_0_60px_rgba(249,115,22,0.4)] hover:shadow-[0_0_80px_rgba(249,115,22,0.6)] hover:scale-105"
          >
            Launch AEON Dial Now
            <ArrowRight className="w-6 h-6" />
          </Link>
          
          <p className="mt-8 text-sm text-gray-500">
            No credit card required • Full access • Built for winners
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t border-zinc-800">
        © {new Date().getFullYear()} AEON Dial • Advanced Efficient Optimized Network
      </footer>
    </main>
  );
}

// Reusable feature card
function FeatureCard({ icon, title, text }: { icon?: React.ReactNode; title: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-all group"
    >
      {icon && (
        <div className="mb-4 text-orange-400 group-hover:text-orange-300 transition-colors">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{text}</p>
    </motion.div>
  );
}