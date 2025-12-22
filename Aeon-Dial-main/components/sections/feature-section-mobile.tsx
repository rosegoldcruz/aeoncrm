"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Zap, Target, Brain, Shield, Rocket, TrendingUp } from "lucide-react"

export function FeatureSection() {
  const [expandedFeatures, setExpandedFeatures] = useState<number[]>([0, 1]) // Show first 2 by default

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Automation",
      text: "Eliminate manual work. Our AI handles lead routing, follow-ups, and qualification automatically.",
      highlight: "GoHighLevel wishes they had this."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Built for Contractors",
      text: "Purpose-built for home services, remodeling, and construction.",
      highlight: "Not a generic tool trying to do everything poorly."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Real-Time Intelligence",
      text: "Live dashboards, instant alerts, and predictive analytics.",
      highlight: "Know what's happening before it happens."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      text: "Bank-level security with role-based access, audit logs, and compliance built in.",
      highlight: "Your data is locked down."
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Lightning Fast",
      text: "Built on Next.js 14 and deployed on Vercel's edge network.",
      highlight: "Sub-100ms response times globally."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scales With You",
      text: "From 1 agent to 1,000. From 10 leads to 10,000.",
      highlight: "The system grows without breaking."
    }
  ]

  const toggleFeature = (index: number) => {
    setExpandedFeatures(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section id="why-aeon" className="relative py-16 px-4 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header - More compact for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
            Why AEON Dial Destroys the Competition
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            This isn't just another CRM. It's a complete operating system built for teams that demand excellence.
          </p>
        </motion.div>

        {/* Primary Features - Large, prominent cards */}
        <div className="space-y-6 mb-8">
          {features.slice(0, 2).map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
              highlight={feature.highlight}
              isPrimary={true}
            />
          ))}
        </div>

        {/* Secondary Features - Collapsible accordion */}
        <div className="space-y-3">
          <div className="text-center mb-6">
            <button
              onClick={() => {
                const allIndices = features.map((_, i) => i)
                setExpandedFeatures(prev =>
                  prev.length === features.length ? [0, 1] : allIndices
                )
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors text-white font-medium min-h-[44px]"
            >
              <span>
                {expandedFeatures.length === features.length ? 'Show Less' : 'View All Features'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedFeatures.length === features.length ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          <AnimatePresence>
            {expandedFeatures.slice(2).map((featureIndex) => {
              const feature = features[featureIndex]
              return (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    text={feature.text}
                    highlight={feature.highlight}
                    isPrimary={false}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Primary CTA - Clear call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-neutral-800"
        >
          <p className="text-lg text-gray-300 mb-6">
            Ready to leave your competitors in the dust?
          </p>
          <button className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl text-white font-bold text-lg shadow-lg transition-all min-h-[56px]">
            Launch AEON Dial Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  text,
  highlight,
  isPrimary = false
}: {
  icon?: React.ReactNode
  title: string
  text: string
  highlight?: string
  isPrimary?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`
        rounded-2xl border transition-all
        ${isPrimary
          ? 'p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 border-orange-500/30 shadow-xl'
          : 'p-6 bg-neutral-900/50 border-neutral-800 hover:border-orange-500/50'
        }
      `}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
              {icon}
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-white mb-2 leading-tight ${
            isPrimary ? 'text-xl' : 'text-lg'
          }`}>
            {title}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-3 text-base">
            {text}
          </p>
          {highlight && (
            <p className="text-orange-400 font-medium text-base leading-relaxed">
              {highlight}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
