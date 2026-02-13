"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { NeuralGrid } from "./neural-grid"
import { HolographicCore } from "./holographic-core"
import { StaticHeroFallback } from "./static-hero-fallback"
import { PerformanceGovernorState } from "@/hooks/use-performance-governor"
import { useCanvasManagement, useCanvasObserver } from "@/hooks/use-canvas-management"

export function HeroScene({ scrollProgress, governor }: { scrollProgress: number, governor: PerformanceGovernorState }) {
  const canvasRef = useCanvasObserver()
  const canvasState = useCanvasManagement(governor)

  const isMobile = window.innerWidth < 768

  // Always use pointer-events: none on mobile to prevent blocking touches
  const containerStyle = {
    pointerEvents: 'none' as const,
    touchAction: 'none' as const,
    // Ensure container doesn't interfere with layout
    position: 'fixed' as const,
    inset: 0,
    zIndex: -10,
  }

  // If fallback is active or canvas shouldn't render, show static version
  if (canvasState.fallbackToStatic || !canvasState.shouldRender) {
    return <StaticHeroFallback scrollProgress={scrollProgress} governor={governor} />
  }

  return (
    <div ref={canvasRef} style={containerStyle}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        dpr={[1, canvasState.dpr]}
        performance={{
          min: 0.5,
          max: governor.webGLQuality === "high" ? 1 : 0.8,
          debounce: governor.isThrottled ? 300 : 200
        }}
        gl={{
          antialias: canvasState.antialias,
          alpha: true,
          powerPreference: canvasState.powerPreference,
          stencil: false,
          depth: true,
          // Disable features that can cause performance issues
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        frameloop={canvasState.frameloop}
        // Ensure canvas itself doesn't block events
        style={{
          pointerEvents: 'none',
          touchAction: 'none'
        }}
      >
        <color attach="background" args={["#000000"]} />

        {/* Lighting - reduce intensity on mobile */}
        <ambientLight intensity={isMobile ? 0.1 : 0.2} />
        <pointLight
          position={[0, 10, 0]}
          intensity={isMobile ? 0.3 : 0.5}
          color="#00ff88"
        />
        <pointLight
          position={[10, 0, 10]}
          intensity={isMobile ? 0.2 : 0.3}
          color="#00ffff"
        />

        <Suspense fallback={null}>
          <NeuralGrid scrollProgress={scrollProgress} governor={governor} />
          <HolographicCore scrollProgress={scrollProgress} governor={governor} />
        </Suspense>

        <fog attach="fog" args={["#000000", 10, 50]} />
      </Canvas>
    </div>
  )
}
