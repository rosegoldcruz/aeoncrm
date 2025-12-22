"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { DeviceCapabilities } from "./use-device-capabilities"

export interface PerformanceGovernorState {
  // Quality settings
  webGLQuality: "high" | "medium" | "low"
  animationScale: number
  particleCount: number
  shaderResolution: number
  blurPasses: number

  // Performance monitoring
  currentFPS: number
  targetFPS: number
  isThrottled: boolean
  isBackgrounded: boolean
  isLowPowerMode: boolean
  batteryLevel: number | null

  // Controls
  enableWebGLEffects: boolean
  enableAnimations: boolean
  enableParticles: boolean
}

export interface PerformanceGovernorActions {
  updateFPS: (fps: number) => void
  setBackgrounded: (backgrounded: boolean) => void
  forceQuality: (quality: "high" | "medium" | "low") => void
}

export function usePerformanceGovernor(capabilities: DeviceCapabilities): [PerformanceGovernorState, PerformanceGovernorActions] {
  const [state, setState] = useState<PerformanceGovernorState>(() => {
    // Initial quality settings based on device capabilities
    const baseQuality = getBaseQuality(capabilities)
    return {
      webGLQuality: baseQuality,
      animationScale: capabilities.animationScale,
      particleCount: baseQuality === "high" ? 50 : baseQuality === "medium" ? 20 : 0,
      shaderResolution: baseQuality === "high" ? 1.0 : baseQuality === "medium" ? 0.75 : 0.5,
      blurPasses: baseQuality === "high" ? 3 : baseQuality === "medium" ? 1 : 0,
      currentFPS: 60,
      targetFPS: capabilities.isMobile ? 60 : 30,
      isThrottled: false,
      isBackgrounded: false,
      isLowPowerMode: capabilities.isLowPowerMode,
      batteryLevel: capabilities.batteryLevel,
      enableWebGLEffects: baseQuality !== "low",
      enableAnimations: capabilities.animationScale > 0,
      enableParticles: baseQuality !== "low" && capabilities.memoryGB >= 4,
    }
  })

  const fpsHistoryRef = useRef<number[]>([])
  const lastFrameTimeRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // FPS monitoring
  const updateFPS = useCallback((fps: number) => {
    fpsHistoryRef.current.push(fps)
    if (fpsHistoryRef.current.length > 10) {
      fpsHistoryRef.current.shift()
    }

    const avgFPS = fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length

    setState(prev => {
      const newState = { ...prev, currentFPS: avgFPS }

      // Auto-adjust quality if FPS drops
      if (avgFPS < prev.targetFPS - 5 && !prev.isThrottled) {
        return adjustQualityDown(newState, capabilities)
      } else if (avgFPS > prev.targetFPS + 10 && prev.webGLQuality !== "high") {
        return adjustQualityUp(newState, capabilities)
      }

      return newState
    })
  }, [capabilities])

  // Background tab detection
  const setBackgrounded = useCallback((backgrounded: boolean) => {
    setState(prev => {
      if (backgrounded && !prev.isBackgrounded) {
        // Throttle animations when backgrounded
        if (throttleTimeoutRef.current) {
          clearTimeout(throttleTimeoutRef.current)
        }
        throttleTimeoutRef.current = setTimeout(() => {
          setState(current => ({ ...current, isThrottled: true }))
        }, 1000) // Delay throttling to avoid flickering
      } else if (!backgrounded && prev.isBackgrounded) {
        // Resume when foregrounded
        if (throttleTimeoutRef.current) {
          clearTimeout(throttleTimeoutRef.current)
          throttleTimeoutRef.current = null
        }
        setState(current => ({ ...current, isThrottled: false }))
      }

      return { ...prev, isBackgrounded: backgrounded }
    })
  }, [])

  // Manual quality override
  const forceQuality = useCallback((quality: "high" | "medium" | "low") => {
    setState(prev => ({
      ...prev,
      webGLQuality: quality,
      ...getQualitySettings(quality, capabilities)
    }))
  }, [capabilities])

  // Monitor FPS using requestAnimationFrame
  useEffect(() => {
    let animationId: number

    const measureFPS = (timestamp: number) => {
      frameCountRef.current++

      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = timestamp
      }

      const delta = timestamp - lastFrameTimeRef.current
      if (delta >= 1000) { // Update every second
        const fps = (frameCountRef.current * 1000) / delta
        updateFPS(Math.round(fps))

        frameCountRef.current = 0
        lastFrameTimeRef.current = timestamp
      }

      if (!state.isBackgrounded) {
        animationId = requestAnimationFrame(measureFPS)
      }
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [state.isBackgrounded, updateFPS])

  // Background/foreground detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      setBackgrounded(document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [setBackgrounded])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current)
      }
    }
  }, [])

  const actions: PerformanceGovernorActions = {
    updateFPS,
    setBackgrounded,
    forceQuality,
  }

  return [state, actions]
}

function getBaseQuality(capabilities: DeviceCapabilities): "high" | "medium" | "low" {
  if (capabilities.prefersReducedMotion) return "low"
  if (capabilities.isLowPowerMode) return "low"
  if (capabilities.gpuTier === "high" && capabilities.memoryGB >= 8 && !capabilities.isMobile) return "high"
  if (capabilities.gpuTier === "medium" || (capabilities.gpuTier === "high" && capabilities.isMobile)) return "medium"
  return "low"
}

function getQualitySettings(quality: "high" | "medium" | "low", capabilities: DeviceCapabilities) {
  switch (quality) {
    case "high":
      return {
        animationScale: capabilities.animationScale,
        particleCount: 50,
        shaderResolution: 1.0,
        blurPasses: 3,
        enableWebGLEffects: true,
        enableAnimations: true,
        enableParticles: capabilities.memoryGB >= 4,
      }
    case "medium":
      return {
        animationScale: capabilities.animationScale * 0.8,
        particleCount: 20,
        shaderResolution: 0.75,
        blurPasses: 1,
        enableWebGLEffects: true,
        enableAnimations: true,
        enableParticles: capabilities.memoryGB >= 4,
      }
    case "low":
      return {
        animationScale: capabilities.animationScale * 0.5,
        particleCount: 0,
        shaderResolution: 0.5,
        blurPasses: 0,
        enableWebGLEffects: false,
        enableAnimations: capabilities.animationScale > 0.3,
        enableParticles: false,
      }
  }
}

function adjustQualityDown(state: PerformanceGovernorState, capabilities: DeviceCapabilities): PerformanceGovernorState {
  if (state.webGLQuality === "high") {
    return {
      ...state,
      webGLQuality: "medium",
      ...getQualitySettings("medium", capabilities)
    }
  } else if (state.webGLQuality === "medium") {
    return {
      ...state,
      webGLQuality: "low",
      ...getQualitySettings("low", capabilities)
    }
  }
  return state
}

function adjustQualityUp(state: PerformanceGovernorState, capabilities: DeviceCapabilities): PerformanceGovernorState {
  if (state.webGLQuality === "low" && capabilities.gpuTier !== "low") {
    return {
      ...state,
      webGLQuality: "medium",
      ...getQualitySettings("medium", capabilities)
    }
  } else if (state.webGLQuality === "medium" && capabilities.gpuTier === "high" && !capabilities.isMobile) {
    return {
      ...state,
      webGLQuality: "high",
      ...getQualitySettings("high", capabilities)
    }
  }
  return state
}
