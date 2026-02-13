import type { PerformanceGovernorState } from "@/hooks/use-performance-governor"

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

export function getAnimationConfig(governor: PerformanceGovernorState): AnimationConfig {
  const { webGLQuality, enableWebGLEffects, enableAnimations, enableParticles, particleCount, blurPasses, animationScale, isThrottled } = governor

  // If throttled (background tab), disable most effects
  if (isThrottled) {
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

  // If animations disabled, return minimal config
  if (!enableAnimations) {
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

  // Dynamic configuration based on governor state
  return {
    enableParallax: webGLQuality !== "low" && enableWebGLEffects,
    enableBlur: webGLQuality === "high" && enableWebGLEffects,
    enableParticles: enableParticles && particleCount > 0,
    particleCount: Math.floor(particleCount * animationScale),
    blurPasses: Math.floor(blurPasses * animationScale),
    transitionDuration: 0.3 * animationScale,
    enableGlow: webGLQuality !== "low" && enableWebGLEffects,
    enableMicroAnimations: webGLQuality === "high" && animationScale > 0.7,
  }
}
