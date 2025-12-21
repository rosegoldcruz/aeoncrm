"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function NeuralGrid({ scrollProgress }: { scrollProgress: number }) {
  const gridRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const nodesRef = useRef<THREE.Points>(null)

  const { positions, nodePositions } = useMemo(() => {
    const positions: number[] = []
    const nodePositions: number[] = []
    const gridSize = 20
    const spacing = 2

    // Create grid lines
    for (let i = -gridSize; i <= gridSize; i++) {
      // Horizontal lines
      positions.push(-gridSize * spacing, 0, i * spacing)
      positions.push(gridSize * spacing, 0, i * spacing)
      
      // Vertical lines
      positions.push(i * spacing, 0, -gridSize * spacing)
      positions.push(i * spacing, 0, gridSize * spacing)
    }

    // Create nodes at intersections
    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let z = -gridSize; z <= gridSize; z += 2) {
        nodePositions.push(x * spacing, 0, z * spacing)
      }
    }

    return { positions, nodePositions }
  }, [])

  useFrame((state) => {
    if (!gridRef.current || !linesRef.current || !nodesRef.current) return

    const time = state.clock.elapsedTime

    // Parallax effect based on scroll
    gridRef.current.position.y = scrollProgress * -5
    gridRef.current.rotation.x = scrollProgress * 0.1

    // Animate line opacity based on scroll velocity
    const material = linesRef.current.material as THREE.LineBasicMaterial
    material.opacity = 0.15 + scrollProgress * 0.1

    // Pulse nodes
    const nodesMaterial = nodesRef.current.material as THREE.PointsMaterial
    nodesMaterial.opacity = 0.4 + Math.sin(time * 2) * 0.2
  })

  return (
    <group ref={gridRef} position={[0, -10, -20]}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={new Float32Array(positions)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00ff88" transparent opacity={0.15} />
      </lineSegments>

      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={new Float32Array(nodePositions)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ff88"
          size={0.1}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  )
}
