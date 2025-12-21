"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { HeroScene } from "./scene"
import { MagneticButton } from "./magnetic-button"

export function CommandHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest)
    })
  }, [scrollYProgress])

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <div ref={containerRef} className="relative h-[150vh] bg-black">
      <HeroScene scrollProgress={scrollProgress} />

      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-6"
        style={{ opacity, scale }}
      >
        {/* Nav */}
        <motion.nav
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-2xl font-bold tracking-tight text-[#00ff88]">
            AEON DIAL
          </div>
          <div className="flex items-center gap-8">
            <a href="/dashboard" className="text-white/70 hover:text-white transition-colors">
              Dashboard
            </a>
            <a href="/pricing" className="text-white/70 hover:text-white transition-colors">
              Pricing
            </a>
            <a href="/docs" className="text-white/70 hover:text-white transition-colors">
              Docs
            </a>
            <MagneticButton href="/dashboard" variant="primary">
              Enter Command Center
            </MagneticButton>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Headline */}
          <div className="space-y-2">
            {["THE CRM", "THAT THINKS", "IN REAL TIME"].map((line, i) => (
              <motion.h1
                key={i}
                className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            AI-powered calling, automation, and customer intelligence — unified.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <MagneticButton href="/dashboard" variant="primary">
              Launch AEON DIAL
            </MagneticButton>
            <MagneticButton href="#overview" variant="secondary">
              Watch System Overview
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollProgress < 0.1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-2 text-white/40">
              <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
              <motion.div
                className="w-[2px] h-12 bg-gradient-to-b from-[#00ff88] to-transparent"
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        {/* Signal Flow Text */}
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])
          }}
        >
          <p className="text-lg text-[#00ff88] font-mono">
            Every call. Every action. One system.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
