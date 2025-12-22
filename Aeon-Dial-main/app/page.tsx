"use client"

import type React from "react"
import { useDeferredScripts, useCriticalResourcePreloader } from "@/hooks/use-deferred-loading"
import { CriticalCSSInjector } from "@/components/critical-css"
import { CommandHero } from "@/components/hero/command-hero-lazy"
import { FeatureSection, AboutSection, CTASection } from "@/components/sections/section-components"
import { FeatureSection as FeatureSectionMobile } from "@/components/sections/feature-section-mobile"
import { AboutSection as AboutSectionMobile } from "@/components/sections/about-section-mobile"
import { CTASection as CTASectionMobile } from "@/components/sections/cta-section-mobile"

export default function HomePage() {
  // Critical resource preloading
  useCriticalResourcePreloader()

  // Defer non-essential scripts
  useDeferredScripts()

  return (
    <main className="bg-black text-white">
      {/* Inject critical CSS immediately */}
      <CriticalCSSInjector />

      {/* COMMAND HERO - Lazy loaded with skeleton */}
      <CommandHero />

      {/* WHY AEON DIAL - Mobile-first responsive */}
      <div className="hidden md:block">
        <FeatureSection />
      </div>
      <div className="block md:hidden">
        <FeatureSectionMobile />
      </div>

      {/* ABOUT SECTION - Mobile-first responsive */}
      <div className="hidden md:block">
        <AboutSection />
      </div>
      <div className="block md:hidden">
        <AboutSectionMobile />
      </div>

      {/* CTA SECTION - Mobile-first responsive */}
      <div className="hidden md:block">
        <CTASection />
      </div>
      <div className="block md:hidden">
        <CTASectionMobile />
      </div>

      {/* FOOTER */}
      <footer className="text-center py-6 px-4 border-t border-zinc-800 bg-black">
        <p className="text-base text-gray-500 mb-4">
          &copy; {new Date().getFullYear()} AEON Dial • Advanced Efficient Optimized Network
        </p>
        <nav className="flex flex-wrap justify-center gap-6" role="navigation" aria-label="Footer navigation">
          <a href="/privacy" className="text-gray-600 hover:text-gray-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-2 rounded-md hover:bg-neutral-900" aria-label="Privacy policy">Privacy</a>
          <span className="text-gray-600" aria-hidden="true">•</span>
          <a href="/terms" className="text-gray-600 hover:text-gray-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-2 rounded-md hover:bg-neutral-900" aria-label="Terms of service">Terms</a>
          <span className="text-gray-600" aria-hidden="true">•</span>
          <a href="/support" className="text-gray-600 hover:text-gray-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center px-3 py-2 rounded-md hover:bg-neutral-900" aria-label="Support">Support</a>
        </nav>
      </footer>
    </main>
  );
}