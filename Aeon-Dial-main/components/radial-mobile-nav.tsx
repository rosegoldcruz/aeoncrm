"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useHapticFeedback } from "@/hooks/use-haptic-feedback"

interface RadialNavProps {
  navigation: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }>
  isOpen: boolean
  onClose: () => void
}

export function RadialMobileNav({ navigation, isOpen, onClose }: RadialNavProps) {
  const pathname = usePathname()
  const { vibrate } = useHapticFeedback()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const radius = 120
  const centerX = window.innerWidth - 80
  const centerY = window.innerHeight - 80

  const getItemPosition = (index: number, total: number) => {
    const angle = (Math.PI / 2) * (index / (total - 1)) - Math.PI / 4
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    }
  }

  const handleItemClick = (href: string) => {
    vibrate("light")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 pointer-events-none">
            {navigation.slice(0, 7).map((item, index) => {
              const pos = getItemPosition(index, Math.min(navigation.length, 7))
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

              return (
                <motion.div
                  key={item.name}
                  initial={{ scale: 0, x: centerX, y: centerY }}
                  animate={{ scale: 1, x: pos.x, y: pos.y }}
                  exit={{ scale: 0, x: centerX, y: centerY }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.03,
                  }}
                  className="absolute pointer-events-auto"
                  style={{
                    transform: `translate(-50%, -50%)`,
                  }}
                  onMouseEnter={() => {
                    setHoveredIndex(index)
                    vibrate("light")
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleItemClick(item.href)}
                    className={`
                      flex items-center justify-center w-14 h-14 rounded-full
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.6)]"
                          : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                      }
                      ${hoveredIndex === index ? "scale-110" : "scale-100"}
                    `}
                  >
                    <item.icon className="w-6 h-6" />
                  </Link>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="bg-neutral-900 text-white text-xs px-2 py-1 rounded shadow-lg">{item.name}</div>
                  </motion.div>
                </motion.div>
              )
            })}

            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              onClick={() => {
                vibrate("medium")
                onClose()
              }}
              className="absolute w-16 h-16 bg-red-500 rounded-full flex items-center justify-center
                shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:bg-red-600 transition-colors pointer-events-auto"
              style={{
                left: centerX,
                top: centerY,
                transform: "translate(-50%, -50%)",
              }}
            >
              <X className="w-8 h-8 text-white" />
            </motion.button>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
