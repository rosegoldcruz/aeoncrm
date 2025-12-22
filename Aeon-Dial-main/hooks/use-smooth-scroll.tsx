"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"

interface ScrollContextValue {
  scrollProgress: number
  lenis: Lenis | null
  isNativeScroll: boolean
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const capabilities = useDeviceCapabilities()
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  // Use native scroll on mobile, Lenis on desktop
  const isNativeScroll = capabilities.isMobile || capabilities.screenWidth < 768

  useEffect(() => {
    if (isNativeScroll) {
      // Native scroll - use regular scroll listener
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const documentHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        )

        const progress = Math.min(scrollTop / (documentHeight - windowHeight), 1)
        setScrollProgress(progress)
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      handleScroll() // Initial call

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    } else {
      // Desktop - use Lenis for smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      })

      lenisRef.current = lenis

      // Update scroll progress
      const updateProgress = () => {
        const scrollTop = lenis.scroll || 0
        const limit = lenis.limit || 1
        const progress = Math.min(scrollTop / limit, 1)
        setScrollProgress(progress)
      }

      // RAF loop for Lenis
      const raf = (time: number) => {
        lenis.raf(time)
        updateProgress()
        rafRef.current = requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        lenis.destroy()
        lenisRef.current = null
      }
    }
  }, [isNativeScroll])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (lenisRef.current && !isNativeScroll) {
        lenisRef.current.resize()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isNativeScroll])

  return (
    <ScrollContext.Provider value={{
      scrollProgress,
      lenis: lenisRef.current,
      isNativeScroll
    }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error("useSmoothScroll must be used within a ScrollProvider")
  }
  return context
}

// Hook that provides scroll progress for components
export function useScrollProgress() {
  const { scrollProgress } = useSmoothScroll()
  return scrollProgress
}

// Hook to get Lenis instance for advanced scroll control
export function useLenis() {
  const { lenis } = useSmoothScroll()
  return lenis
}
