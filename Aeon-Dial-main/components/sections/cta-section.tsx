"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
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
  )
}
