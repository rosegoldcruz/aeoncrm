"use client"

import { useCallback } from "react"

export type HapticPattern = "light" | "medium" | "heavy" | "success" | "warning" | "error"

export function useHapticFeedback() {
  const vibrate = useCallback((pattern: HapticPattern) => {
    if (!("vibrate" in navigator)) {
      return
    }

    const patterns: Record<HapticPattern, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 50, 10],
      warning: [20, 100, 20],
      error: [30, 100, 30, 100, 30],
    }

    try {
      navigator.vibrate(patterns[pattern])
    } catch {
    }
  }, [])

  return { vibrate }
}
