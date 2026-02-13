"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface MagneticButtonProps {
  children: React.ReactNode
  href: string
  variant?: "primary" | "secondary"
}

export function MagneticButton({ children, href, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.3
    const y = (clientY - (top + height / 2)) * 0.3
    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseClasses = "relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-block"
  const variantClasses = variant === "primary"
    ? "bg-[#00ff88] text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
    : "bg-transparent border-2 border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10"

  return (
    <Link href={href} legacyBehavior>
      <motion.a
        ref={ref}
        className={`${baseClasses} ${variantClasses}`}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.a>
    </Link>
  )
}
