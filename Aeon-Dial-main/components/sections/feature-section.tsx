"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Target, Brain, Shield, Rocket, TrendingUp } from "lucide-react"

export function FeatureSection() {
  return (
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
  )
}

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
  )
}
