"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function CommandHero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-black">
      {/* Simple gradient background - no WebGL complexity */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />

      {/* Navigation - Simple, works everywhere */}
      <nav className="relative z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
        <Link href="/" className="text-xl md:text-2xl font-bold text-orange-500">
          AEON DIAL
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/dashboard" 
            className="text-white/70 hover:text-white transition-colors py-2 px-3"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Launch App
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-3 text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-20 px-6 md:hidden">
          <div className="flex flex-col items-center gap-8 py-8">
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
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 md:px-6 text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4 md:mb-6">
          THE CRM THAT
          <br />
          <span className="text-orange-500">THINKS</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto mb-8 md:mb-12 px-4">
          AI-powered calling, automation, and customer intelligence — unified.
        </p>

        {/* Single Primary CTA */}
        <Link
          href="/dashboard"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 md:py-5 md:px-12 rounded-xl text-lg md:text-xl transition-colors shadow-lg shadow-orange-500/25"
        >
          Launch AEON DIAL
        </Link>

        {/* Trust indicator */}
        <p className="mt-8 text-sm text-white/40">
          No credit card required • Free to start
        </p>
      </div>
    </div>
  )
}
