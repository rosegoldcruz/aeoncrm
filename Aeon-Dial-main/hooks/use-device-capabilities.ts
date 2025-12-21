"use client"

import { useState, useEffect } from "react"

export interface DeviceCapabilities {
  isMobile: boolean
  screenWidth: number
  gpuTier: "high" | "medium" | "low"
  batteryLevel: number | null
  isLowPowerMode: boolean
  prefersReducedMotion: boolean
  animationScale: number
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    screenWidth: 1920,
    gpuTier: "high",
    batteryLevel: null,
    isLowPowerMode: false,
    prefersReducedMotion: false,
    animationScale: 1,
  })

  useEffect(() => {
    const detectCapabilities = async () => {
      const screenWidth = window.innerWidth
      const isMobile = screenWidth < 768

      const gpuTier = detectGPUTier()

      let batteryLevel: number | null = null
      let isLowPowerMode = false

      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery()
          batteryLevel = battery.level
          isLowPowerMode = battery.level < 0.2 || battery.charging === false
        } catch (e) {
          console.log("[v0] Battery API not available")
        }
      }

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      let animationScale = 1

      if (prefersReducedMotion) {
        animationScale = 0
      } else if (isLowPowerMode) {
        animationScale = 0.3
      } else if (gpuTier === "low") {
        animationScale = 0.5
      } else if (gpuTier === "medium") {
        animationScale = 0.7
      } else if (isMobile) {
        animationScale = 0.8
      }

      setCapabilities({
        isMobile,
        screenWidth,
        gpuTier,
        batteryLevel,
        isLowPowerMode,
        prefersReducedMotion,
        animationScale,
      })
    }

    detectCapabilities()

    const handleResize = () => {
      detectCapabilities()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return capabilities
}

function detectGPUTier(): "high" | "medium" | "low" {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    if (!gl) return "low"

    const debugInfo = (gl as any).getExtension("WEBGL_debug_renderer_info")
    if (!debugInfo) return "medium"

    const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()

    if (
      renderer.includes("nvidia") ||
      renderer.includes("geforce") ||
      renderer.includes("radeon") ||
      renderer.includes("apple m1") ||
      renderer.includes("apple m2") ||
      renderer.includes("apple m3")
    ) {
      return "high"
    }

    if (renderer.includes("intel hd") || renderer.includes("mali") || renderer.includes("adreno 3")) {
      return "low"
    }

    return "medium"
  } catch (e) {
    return "medium"
  }
}
