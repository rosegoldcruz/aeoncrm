"use client"

import { motion } from "framer-motion"
import { PerformanceGovernorState } from "@/hooks/use-performance-governor"

interface StaticHeroFallbackProps {
  scrollProgress: number
  governor: PerformanceGovernorState
}

export function StaticHeroFallback({ scrollProgress, governor }: StaticHeroFallbackProps) {
  const opacity = scrollProgress > 0.5 ? 0.8 : scrollProgress > 0.1 ? 1 : 1
  const scale = scrollProgress > 1 ? 0.95 : 1

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        opacity,
        transform: `scale(${scale})`
      }}
    >
      {/* Static gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.05) 0%, transparent 40%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%)
          `
        }}
      />

      {/* Animated grid pattern (CSS only) */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Floating particles (CSS animations) */}
      {Array.from({ length: Math.min(governor.particleCount, 20) }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00ff88] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* Performance indicator */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded font-mono">
        Static Mode - Battery Saver
      </div>
    </div>
  )
}
