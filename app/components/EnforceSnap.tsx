'use client'

import { useEffect } from 'react'

export default function EnforceSnap() {
  useEffect(() => {
    const container = document.querySelector('.snap-scroll-container') as HTMLElement
    if (!container) return

    let ticking = false

    const snapToNearestSection = () => {
      if (ticking) return
      ticking = true

      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop
        const sectionHeight = window.innerHeight
        const currentSection = Math.round(scrollTop / sectionHeight)
        const targetScroll = currentSection * sectionHeight

        // Only snap if we're not already aligned
        if (Math.abs(scrollTop - targetScroll) > 1) {
          container.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          })
        }

        ticking = false
      })
    }

    // Debounce scroll events
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        snapToNearestSection()
      }, 100)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('scrollend', snapToNearestSection, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('scrollend', snapToNearestSection)
      clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}

