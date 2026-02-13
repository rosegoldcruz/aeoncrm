"use client"

import { useState, useEffect } from "react"

export interface DeviceCapabilities {
  isMobile: boolean
  screenWidth: number
  devicePixelRatio: number
  gpuTier: "high" | "medium" | "low"
  memoryGB: number
  batteryLevel: number | null
  isLowPowerMode: boolean
  prefersReducedMotion: boolean
  animationScale: number
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    screenWidth: 1920,
    devicePixelRatio: 1,
    gpuTier: "high",
    memoryGB: 8,
    batteryLevel: null,
    isLowPowerMode: false,
    prefersReducedMotion: false,
    animationScale: 1,
  })

  useEffect(() => {
    const detectCapabilities = async () => {
      const screenWidth = window.innerWidth
      const devicePixelRatio = window.devicePixelRatio || 1
      const isMobile = screenWidth < 768

      const gpuTier = detectGPUTier()

      // Memory detection
      const memoryGB = (navigator as any).deviceMemory || 4 // Default to 4GB if not available

      let batteryLevel: number | null = null
      let isLowPowerMode = false

      if ("getBattery" in navigator) {
        try {
          const battery = await (navigator as any).getBattery()
          batteryLevel = battery.level
          isLowPowerMode = battery.level < 0.2 || battery.charging === false
        } catch {
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
        devicePixelRatio,
        gpuTier,
        memoryGB,
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
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext

    if (!gl) return "low"

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info")
    let renderer = ""
    if (debugInfo) {
      renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
    }

    // Check renderer strings for known high-end GPUs
    if (
      renderer.includes("nvidia") ||
      renderer.includes("geforce") ||
      renderer.includes("radeon") ||
      renderer.includes("apple m1") ||
      renderer.includes("apple m2") ||
      renderer.includes("apple m3") ||
      renderer.includes("adreno 6") ||
      renderer.includes("mali-g7")
    ) {
      return "high"
    }

    // Check for known low-end GPUs
    if (
      renderer.includes("intel hd") ||
      renderer.includes("intel uhd") ||
      renderer.includes("mali-g31") ||
      renderer.includes("mali-g52") ||
      renderer.includes("adreno 3") ||
      renderer.includes("adreno 4") ||
      renderer.includes("powervr")
    ) {
      return "low"
    }

    // Check WebGL capabilities
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE)
    const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
    const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS)

    // High-end capabilities
    if (maxTextureSize >= 4096 && maxRenderbufferSize >= 4096 && maxViewportDims[0] >= 4096) {
      return "high"
    }

    // Low-end capabilities
    if (maxTextureSize < 2048 || maxRenderbufferSize < 2048) {
      return "low"
    }

    return "medium"
  } catch (e) {
    return "medium"
  }
}
