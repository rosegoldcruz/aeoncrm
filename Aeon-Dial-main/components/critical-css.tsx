"use client"

import { useEffect } from "react"

// Critical CSS for above-the-fold content
const criticalCSS = `
  /* Critical styles for immediate paint */
  html {
    font-family: var(--font-geist-sans), system-ui, -apple-system, sans-serif;
  }

  body {
    margin: 0;
    background: #000;
    color: #fff;
    line-height: 1.6;
  }

  /* Hero section critical styles */
  .hero-critical {
    position: relative;
    height: 150vh;
    background: #000;
    overflow: hidden;
  }

  .hero-nav-critical {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.5rem 2rem;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .hero-logo-critical {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00ff88;
    letter-spacing: -0.025em;
  }

  .hero-content-critical {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 1.5rem;
  }

  .hero-title-critical {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 900;
    text-align: center;
    line-height: 1.1;
    margin-bottom: 2rem;
  }

  .hero-gradient-critical {
    background: linear-gradient(135deg, #fff 0%, #f3f4f6 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 200%;
    animation: gradient-shift 3s ease-in-out infinite;
  }

  .hero-subtitle-critical {
    font-size: clamp(1.125rem, 3vw, 1.5rem);
    color: #9ca3af;
    text-align: center;
    max-width: 42rem;
    margin: 0 auto 2rem;
  }

  .hero-cta-critical {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 3rem;
    background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
    color: #fff;
    font-weight: bold;
    font-size: 1.25rem;
    border-radius: 0.75rem;
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 10px 25px rgba(249, 115, 22, 0.3);
  }

  .hero-cta-critical:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(249, 115, 22, 0.4);
  }

  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  /* Loading state */
  .skeleton {
    background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Hide scrollbar initially for clean load */
  body { scrollbar-width: none; -ms-overflow-style: none; }
  body::-webkit-scrollbar { display: none; }
`

export function CriticalCSSInjector() {
  useEffect(() => {
    // Inject critical CSS immediately
    const style = document.createElement('style')
    style.textContent = criticalCSS
    style.setAttribute('data-critical', 'true')

    // Insert at the beginning of head for highest priority
    const firstStyle = document.head.querySelector('style') || document.head.querySelector('link[rel="stylesheet"]')
    if (firstStyle) {
      document.head.insertBefore(style, firstStyle)
    } else {
      document.head.appendChild(style)
    }

    // Remove after non-critical styles load
    const timer = setTimeout(() => {
      style.remove()
    }, 3000)

    return () => {
      clearTimeout(timer)
      style.remove()
    }
  }, [])

  return null
}
