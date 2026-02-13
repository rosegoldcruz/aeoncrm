"use client"

import { useState, useEffect } from "react"

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY || document.documentElement.scrollTop

    const updateScrollDirection = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )
      const windowHeight = window.innerHeight

      // Check if at top or bottom
      setIsAtTop(scrollY < 50)
      setIsAtBottom(scrollY + windowHeight >= documentHeight - 50)

      // Determine scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        setScrollDirection('down')
      } else if (scrollY < lastScrollY) {
        setScrollDirection('up')
      }

      lastScrollY = scrollY
    }

    // Throttle scroll events for performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollDirection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollDirection() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollDirection, isAtTop, isAtBottom }
}
