"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Menu, X, Phone, Brain, Shield, Zap, ArrowRight } from "lucide-react"

// Motion tokens
const MOTION = {
  fast: { duration: 0.2 },
  medium: { duration: 0.4 },
  slow: { duration: 0.8 },
  spring: { type: "spring", stiffness: 300, damping: 30 },
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Close menu on route change or escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const animationProps = prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" }
  }

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* ═══════════════════════════════════════════════════════════════════
          NAVIGATION - Simple, works everywhere
      ═══════════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16">
          <Link href="/" className="text-xl font-bold text-orange-500">
            AEON DIAL
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-6 rounded-lg transition-all hover:shadow-lg hover:shadow-orange-500/20"
            >
              Launch App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 bg-black z-40 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 py-12">
              <Link 
                href="/dashboard" 
                className="text-xl text-white"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-8 rounded-lg text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Launch App
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - Cinematic, staggered reveal
      ═══════════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.15),transparent)]"
          animate={prefersReducedMotion ? {} : { 
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }}
        />

        <motion.div 
          className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center"
          style={prefersReducedMotion ? {} : { opacity: heroOpacity, scale: heroScale }}
        >
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...MOTION.slow, delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm text-orange-400 font-medium">Real-Time Intelligence</span>
          </motion.div>

          {/* Headline - Staggered reveal */}
          <div className="space-y-2 mb-8">
            {["THE CRM THAT", "THINKS WITH YOU"].map((line, i) => (
              <motion.h1
                key={i}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...MOTION.slow, delay: 0.4 + i * 0.15 }}
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  <span className="text-white">{line}</span>
                )}
              </motion.h1>
            ))}
          </div>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...MOTION.slow, delay: 0.8 }}
          >
            AI-powered calling, automation, and customer intelligence — unified in one command center.
          </motion.p>

          {/* CTAs - Primary + Secondary */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...MOTION.slow, delay: 1 }}
          >
            <Link
              href="/dashboard"
              className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center gap-2"
            >
              Launch AEON Dial
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/dashboard"
              className="text-white/70 hover:text-white font-medium py-4 px-8 rounded-xl text-lg transition-colors border border-white/10 hover:border-white/20 hover:bg-white/5"
            >
              Watch Overview
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          INTELLIGENCE STRIP - Horizontal animated section
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 border-y border-white/5 bg-neutral-950/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Phone, label: "Live Calls", value: "Real-time monitoring" },
              { icon: Brain, label: "AI Decisions", value: "Instant intelligence" },
              { icon: Shield, label: "Compliance", value: "Always protected" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5"
                {...animationProps}
                transition={{ ...MOTION.medium, delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-white font-semibold">{item.label}</p>
                  <p className="text-white/50 text-sm">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRODUCT VISUAL - Glass panel mock UI
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
          <motion.div 
            className="text-center mb-16"
            {...animationProps}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Command Center
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Every call, every decision, every insight — unified in one intelligent interface.
            </p>
          </motion.div>

          {/* Mock UI Panel */}
          <motion.div
            className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-1 shadow-2xl"
            {...animationProps}
            transition={MOTION.slow}
          >
            <div className="rounded-xl bg-neutral-900/80 backdrop-blur-xl p-6 md:p-8">
              {/* Mock header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-white/40 text-sm font-mono">aeon-dial.app</div>
              </div>

              {/* Mock content grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Active Calls", value: "24" },
                  { label: "AI Actions", value: "1,847" },
                  { label: "Compliance", value: "100%" },
                  { label: "Response Time", value: "0.3s" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                    <p className="text-white/50 text-xs mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Mock activity */}
              <div className="mt-6 space-y-3">
                {[
                  "AI routed call to available agent",
                  "Compliance check passed",
                  "Lead score updated: 87 → 92",
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.01]">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-white/60 text-sm">{activity}</span>
                    <span className="text-white/30 text-xs ml-auto">just now</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY AEON DIAL - Three value cards
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div 
            className="text-center mb-16"
            {...animationProps}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why AEON Dial?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Built for operators who demand intelligence, speed, and reliability.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Thinks in Real Time",
                description: "AI that anticipates needs, routes intelligently, and learns from every interaction."
              },
              {
                icon: Zap,
                title: "Built for Operators",
                description: "Designed for teams that move fast. No bloat, no friction, just results."
              },
              {
                icon: Shield,
                title: "Not a Generic CRM",
                description: "Purpose-built for calling operations. Every feature serves the mission."
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all hover:bg-white/[0.04]"
                {...animationProps}
                transition={{ ...MOTION.medium, delay: i * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <card.icon className="w-7 h-7 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-white/50 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST SECTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div {...animationProps}>
            <p className="text-orange-500 font-medium mb-4">BUILT FOR SERIOUS OPERATORS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Speed. Intelligence. Reliability.
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Every millisecond matters. Every decision counts. AEON Dial is built for teams that can&apos;t afford to wait.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA - Single, clear action
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />
        
        <motion.div 
          className="max-w-3xl mx-auto px-4 md:px-8 text-center relative"
          {...animationProps}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your operations?
          </h2>
          <p className="text-lg text-white/60 mb-10">
            Join operators who chose intelligence over complexity.
          </p>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-10 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-6 text-sm text-white/40">
            No credit card required
          </p>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER - Minimal, functional
      ═══════════════════════════════════════════════════════════════════ */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-orange-500 font-bold text-xl">AEON DIAL</div>
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-white/50 hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} AEON Dial
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}