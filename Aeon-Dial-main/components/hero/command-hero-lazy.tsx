"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { motion } from "framer-motion"

// Lazy load heavy components
const CommandHero = dynamic(() => import("@/components/hero/command-hero").then(mod => ({ default: mod.CommandHero })), {
  loading: () => <CommandHeroSkeleton />,
  ssr: false // Disable SSR for 3D components on mobile
})

// Skeleton loader for CommandHero
function CommandHeroSkeleton() {
  return (
    <div className="relative h-[120vh] md:h-[150vh] bg-black">
      {/* Skeleton background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black animate-pulse" />

      {/* Skeleton header */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 md:px-6">
        <motion.nav
          className="absolute top-0 left-0 right-0 flex items-center justify-center px-4 md:px-8 py-4 md:py-6 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-xl md:text-2xl font-bold tracking-tight text-[#00ff88]">
            AEON DIAL
          </div>
        </motion.nav>

        {/* Skeleton title - Mobile-first sizing */}
        <div className="text-center space-y-6 md:space-y-8 max-w-md md:max-w-4xl">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <motion.div
              className="h-12 md:h-16 bg-gradient-to-r from-neutral-700 to-neutral-600 rounded-lg animate-pulse"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.div
              className="h-12 md:h-16 bg-gradient-to-r from-neutral-700 to-neutral-600 rounded-lg animate-pulse"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            />
            <motion.div
              className="h-12 md:h-16 bg-gradient-to-r from-neutral-700 to-neutral-600 rounded-lg animate-pulse"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>

          {/* Skeleton subtitle */}
          <motion.div
            className="h-5 md:h-6 bg-neutral-700 rounded-lg animate-pulse max-w-sm md:max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />

          {/* Skeleton CTA button - Single prominent button for mobile */}
          <motion.div
            className="flex items-center justify-center pt-6 md:pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl animate-pulse w-full max-w-xs md:w-48" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export { CommandHero }
