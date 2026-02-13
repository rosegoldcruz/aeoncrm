"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { motion } from "framer-motion"

// Lazy load feature section
const FeatureSection = dynamic(() => import("@/components/sections/feature-section").then(mod => ({ default: mod.FeatureSection })), {
  loading: () => <FeatureSectionSkeleton />
})

// Lazy load about section
const AboutSection = dynamic(() => import("@/components/sections/about-section").then(mod => ({ default: mod.AboutSection })), {
  loading: () => <AboutSectionSkeleton />
})

// Lazy load CTA section
const CTASection = dynamic(() => import("@/components/sections/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <CTASectionSkeleton />
})

// Skeleton loaders
function FeatureSectionSkeleton() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-16 bg-gradient-to-r from-neutral-700 to-neutral-600 rounded-lg animate-pulse max-w-4xl mx-auto mb-6" />
          <div className="h-6 bg-neutral-700 rounded-lg animate-pulse max-w-2xl mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="h-8 w-8 bg-neutral-700 rounded-lg animate-pulse mb-4" />
              <div className="h-6 bg-neutral-700 rounded-lg animate-pulse mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-neutral-700 rounded animate-pulse" />
                <div className="h-4 bg-neutral-700 rounded animate-pulse w-4/5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSectionSkeleton() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-16 bg-neutral-700 rounded-lg animate-pulse max-w-3xl mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="h-8 bg-orange-900 rounded-lg animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-neutral-700 rounded animate-pulse" />
              <div className="h-4 bg-neutral-700 rounded animate-pulse" />
              <div className="h-4 bg-neutral-700 rounded animate-pulse w-4/5" />
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-6 w-6 bg-neutral-700 rounded animate-pulse" />
                  <div className="h-6 bg-neutral-700 rounded animate-pulse w-32" />
                </div>
                <div className="h-4 bg-neutral-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASectionSkeleton() {
  return (
    <section className="relative py-32 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black animate-pulse" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-16 bg-neutral-700 rounded-lg animate-pulse mb-6" />
        <div className="h-6 bg-neutral-700 rounded animate-pulse max-w-2xl mx-auto mb-4" />
        <div className="h-4 bg-neutral-700 rounded animate-pulse max-w-xl mx-auto mb-12" />

        <div className="h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl animate-pulse w-64 mx-auto mb-8" />
        <div className="h-4 bg-neutral-700 rounded animate-pulse w-48 mx-auto" />
      </motion.div>
    </section>
  )
}

export { FeatureSection, AboutSection, CTASection }
