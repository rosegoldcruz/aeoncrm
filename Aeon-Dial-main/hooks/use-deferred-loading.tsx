"use client"

import { useEffect } from "react"

// Defer loading of non-critical scripts
export function useDeferredScripts() {
  useEffect(() => {
    const scripts = [
      // Analytics (defer)
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
        async: true,
        defer: true,
        priority: 'low'
      },
      // Social media widgets (defer heavily)
      // Add other non-critical scripts here
    ]

    const loadScript = (script: typeof scripts[0], delay = 2000) => {
      setTimeout(() => {
        const scriptElement = document.createElement('script')
        scriptElement.src = script.src
        scriptElement.async = script.async
        scriptElement.defer = script.defer

        // Add loading priority hint
        scriptElement.setAttribute('fetchpriority', script.priority)

        document.head.appendChild(scriptElement)
      }, delay)
    }

    // Load scripts with increasing delays
    scripts.forEach((script, index) => {
      loadScript(script, 2000 + (index * 1000))
    })
  }, [])
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  }

  return (ref: React.RefObject<Element>) => {
    useEffect(() => {
      const element = ref.current
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback()
              observer.disconnect()
            }
          })
        },
        defaultOptions
      )

      observer.observe(element)

      return () => observer.disconnect()
    }, [callback, defaultOptions.threshold, defaultOptions.rootMargin])
  }
}

// Preload critical resources
export function useCriticalResourcePreloader() {
  useEffect(() => {
    // Preload critical fonts
    const fontLinks = [
      { href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap', rel: 'preload', as: 'style' },
      { href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap', rel: 'preload', as: 'style' }
    ]

    fontLinks.forEach(({ href, rel, as }) => {
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      link.as = as
      link.setAttribute('fetchpriority', 'high')
      document.head.appendChild(link)
    })

    // Preload critical images
    const imageLinks = [
      // Add critical hero images or icons here
    ]

    imageLinks.forEach(({ href }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = 'image'
      link.setAttribute('fetchpriority', 'high')
      document.head.appendChild(link)
    })
  }, [])
}
