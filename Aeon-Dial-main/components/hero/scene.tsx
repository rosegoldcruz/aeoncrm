"use client"

import { Canvas } from "@react-three/fiber"
import { NeuralGrid } from "./neural-grid"
import { HolographicCore } from "./holographic-core"

export function HeroScene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00ff88" />
        <pointLight position={[10, 0, 10]} intensity={0.3} color="#00ffff" />

        <NeuralGrid scrollProgress={scrollProgress} />
        <HolographicCore scrollProgress={scrollProgress} />

        <fog attach="fog" args={["#000000", 10, 50]} />
      </Canvas>
    </div>
  )
}
