"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useDeviceCapabilities } from "./use-device-capabilities"
import { PerformanceGovernorState } from "./use-performance-governor"

export interface CanvasState {
  shouldRender: boolean
  dpr: number
  frameloop: "always" | "demand" | "never"
  antialias: boolean
  powerPreference: "default" | "high-performance" | "low-power"
  fallbackToStatic: boolean
}

export function useCanvasManagement(governor: PerformanceGovernorState): CanvasState {
  const capabilities = useDeviceCapabilities()
  const [isVisible, setIsVisible] = useState(true)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [fallbackToStatic, setFallbackToStatic] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // DPR calculation with mobile caps
  const dpr = useCallback(() => {
    const baseDPR = window.devicePixelRatio || 1
    const maxMobileDPR = capabilities.isMobile ? 1.5 : 2
    const qualityMultiplier = governor.webGLQuality === "high" ? 1 :
                             governor.webGLQuality === "medium" ? 0.75 : 0.5

    // Battery-aware DPR reduction
    const batteryMultiplier = governor.isLowPowerMode ? 0.7 :
                             governor.batteryLevel && governor.batteryLevel < 0.2 ? 0.8 : 1

    return Math.min(
      baseDPR * qualityMultiplier * batteryMultiplier * governor.shaderResolution,
      maxMobileDPR
    )
  }, [capabilities.isMobile, governor])

  // Visibility API for tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  // Intersection Observer for offscreen detection
  const setupIntersectionObserver = useCallback((element: HTMLElement) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px' // Add margin for pre-loading
      }
    )

    observerRef.current.observe(element)
  }, [])

  // Performance monitoring and fallback logic
  useEffect(() => {
    if (governor.currentFPS < 30 && governor.webGLQuality !== "low") {
      setFallbackToStatic(true)
    } else if (governor.currentFPS > 50 && !fallbackToStatic) {
      setFallbackToStatic(false)
    }
  }, [governor.currentFPS, governor.webGLQuality, fallbackToStatic])

  // Cleanup
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Determine rendering state
  const shouldRender = isVisible && isIntersecting && !governor.isThrottled && !fallbackToStatic

  // Frame loop management
  const frameloop: "always" | "demand" | "never" = (() => {
    if (!shouldRender) return "never"
    if (governor.isThrottled || governor.isLowPowerMode) return "demand"
    return "always"
  })()

  // Antialiasing based on performance
  const antialias = governor.webGLQuality !== "low" && !governor.isThrottled && !fallbackToStatic

  // Power preference
  const powerPreference: "default" | "high-performance" | "low-power" = (() => {
    if (governor.isLowPowerMode || capabilities.isMobile) return "low-power"
    if (governor.webGLQuality === "high" && !capabilities.isMobile) return "high-performance"
    return "default"
  })()

  return {
    shouldRender,
    dpr: dpr(),
    frameloop,
    antialias,
    powerPreference,
    fallbackToStatic
  }
}

// Hook for connecting canvas ref to intersection observer
export function useCanvasObserver() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const setupObserver = () => {
      if (!canvasRef.current) return

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          // This can be used by parent components if needed
        },
        {
          threshold: 0.1,
          rootMargin: '50px'
        }
      )

      observerRef.current.observe(canvasRef.current)
    }

    if (canvasRef.current) {
      setupObserver()
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return canvasRef
}
