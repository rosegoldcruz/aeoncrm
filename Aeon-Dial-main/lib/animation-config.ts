import type { DeviceCapabilities } from "@/hooks/use-device-capabilities"

export interface AnimationConfig {
  enableParallax: boolean
  enableBlur: boolean
  enableParticles: boolean
  particleCount: number
  blurPasses: number
  transitionDuration: number
  enableGlow: boolean
  enableMicroAnimations: boolean
}

export function getAnimationConfig(capabilities: DeviceCapabilities): AnimationConfig {
  const { animationScale, gpuTier, isMobile, prefersReducedMotion } = capabilities

  if (prefersReducedMotion) {
    return {
      enableParallax: false,
      enableBlur: false,
      enableParticles: false,
      particleCount: 0,
      blurPasses: 0,
      transitionDuration: 0,
      enableGlow: false,
      enableMicroAnimations: false,
    }
  }

  if (gpuTier === "high" && !isMobile && animationScale >= 0.9) {
    return {
      enableParallax: true,
      enableBlur: true,
      enableParticles: true,
      particleCount: 50,
      blurPasses: 3,
      transitionDuration: 0.3,
      enableGlow: true,
      enableMicroAnimations: true,
    }
  }

  if (gpuTier === "medium" || (gpuTier === "high" && isMobile)) {
    return {
      enableParallax: true,
      enableBlur: true,
      enableParticles: true,
      particleCount: 20,
      blurPasses: 1,
      transitionDuration: 0.2,
      enableGlow: true,
      enableMicroAnimations: false,
    }
  }

  return {
    enableParallax: false,
    enableBlur: false,
    enableParticles: false,
    particleCount: 0,
    blurPasses: 0,
    transitionDuration: 0.15,
    enableGlow: false,
    enableMicroAnimations: false,
  }
}
