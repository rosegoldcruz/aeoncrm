"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useHapticFeedback } from "@/hooks/use-haptic-feedback"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { useScrollProgress } from "@/hooks/use-smooth-scroll"

interface ThumbNavigationProps {
  navigation: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
  }>
}

export function ThumbNavigation({ navigation }: ThumbNavigationProps) {
  const pathname = usePathname()
  const { vibrate } = useHapticFeedback()
  const { scrollDirection, isAtTop, isAtBottom } = useScrollDirection()
  const scrollProgress = useScrollProgress()

  // Auto-hide navigation based on scroll direction, but always show at top/bottom
  const isVisible = scrollDirection === 'up' || isAtTop || isAtBottom

  const handleNavTap = (href: string, name: string) => {
    vibrate("light")
    // Add ripple effect or visual feedback
  }

  const handleQuickActionTap = () => {
    vibrate("heavy")
    // Navigate to dashboard or open quick action menu
    // For now, we'll navigate to dashboard
    window.location.href = '/dashboard'
  }

  // Only show the most important navigation items (up to 5)
  const primaryNav = navigation.slice(0, 4)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8
          }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-800 thumb-navigation"
          style={{
            paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
          }}
        >
          <div className="flex items-center justify-around px-2 py-2">
            {/* Navigation Items */}
            {primaryNav.map((item, index) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")

              return (
                <motion.div
                  className="flex-1 flex flex-col items-center thumb-nav-item"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavTap(item.href, item.name)}
                    className="relative flex flex-col items-center justify-center w-full py-3 px-2 rounded-lg transition-colors min-h-[56px]"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-orange-500/20 rounded-lg"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      className={`relative z-10 mb-2 ${
                        isActive ? 'text-orange-500' : 'text-neutral-400'
                      }`}
                      whileTap={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <item.icon className="w-6 h-6" />
                    </motion.div>

                    {/* Label - Increased size for WCAG compliance */}
                    <motion.span
                      className={`text-sm font-medium leading-none ${
                        isActive ? 'text-orange-500' : 'text-neutral-500'
                      }`}
                      animate={{ opacity: isActive ? 1 : 0.8 }}
                    >
                      {item.name}
                    </motion.span>

                    {/* Tap ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-white/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 1, opacity: 0.3 }}
                      transition={{ duration: 0.15 }}
                    />
                  </Link>
                </motion.div>
              )
            })}

            {/* Quick Action Button */}
            <motion.div
              className="flex-1 flex flex-col items-center"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button
                onClick={handleQuickActionTap}
                className="relative flex flex-col items-center justify-center w-full py-3 px-2 rounded-lg transition-colors group quick-action-btn min-h-[56px]"
                aria-label="Open quick actions menu"
              >
                {/* Central action button with special styling */}
                <motion.div
                  className="relative z-10 mb-2 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-active:shadow-orange-500/50"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-4 h-4 border-2 border-white/80 border-t-transparent rounded-full" />
                  </motion.div>

                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-orange-400/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <span className="text-sm font-medium text-neutral-500 leading-none">
                  Dial
                </span>

                {/* Enhanced tap feedback */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-orange-500/20"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 1, opacity: 0.5 }}
                  transition={{ duration: 0.2 }}
                />
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator hint */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: scrollDirection === 'down' ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-neutral-800 text-neutral-400 text-[10px] px-2 py-1 rounded-full whitespace-nowrap">
              ↑ Swipe up to show nav
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
