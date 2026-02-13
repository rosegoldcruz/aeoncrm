"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-16 px-4 text-center overflow-hidden bg-gradient-to-b from-neutral-950 via-orange-950/10 to-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Simplified, compelling headline */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-black text-white">
              Ready to Win?
            </h2>
            <Sparkles className="w-6 h-6 text-orange-400" />
          </div>

          {/* Clear value proposition */}
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Your competitors are still using outdated tools.
            <span className="text-orange-400 font-semibold"> You're about to leave them in the dust.</span>
          </p>

          {/* Single, prominent CTA button */}
          <Link
            href="/dashboard"
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all text-lg font-bold shadow-lg min-h-[56px] text-white"
          >
            Launch AEON Dial Now
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Trust signals - simplified */}
          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-base text-gray-500 mb-3">
              No credit card required • Full access • Built for winners
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span>⚡ Free setup</span>
              <span>•</span>
              <span>🔒 Enterprise security</span>
              <span>•</span>
              <span>🚀 24/7 support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
