"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function HolographicCore({ scrollProgress }: { scrollProgress: number }) {
  const coreRef = useRef<THREE.Group>(null)
  const geometryRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!coreRef.current || !geometryRef.current) return

    const time = state.clock.elapsedTime

    // Slow rotation
    coreRef.current.rotation.y = time * 0.1
    coreRef.current.rotation.x = Math.sin(time * 0.2) * 0.1

    // Breathing scale
    const breathe = 1 + Math.sin(time * 0.5) * 0.05
    coreRef.current.scale.setScalar(breathe)

    // Parallax based on scroll
    coreRef.current.position.y = scrollProgress * -3
    coreRef.current.position.z = -15 + scrollProgress * 2

    // Glow intensity
    const material = geometryRef.current.material as THREE.MeshStandardMaterial
    material.emissiveIntensity = 0.5 + scrollProgress * 0.5
  })

  return (
    <group ref={coreRef} position={[0, 0, -15]}>
      <mesh ref={geometryRef}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
