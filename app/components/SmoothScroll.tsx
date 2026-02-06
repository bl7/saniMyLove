'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    const container = document.querySelector('.snap-scroll-container') as HTMLElement
    if (!container) return

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout
    let wheelDelta = 0
    let wheelTimeout: NodeJS.Timeout

    const handleWheel = (e: WheelEvent) => {
      // Accumulate wheel delta
      wheelDelta += e.deltaY

      // Clear timeout if user stops scrolling
      clearTimeout(wheelTimeout)
      wheelTimeout = setTimeout(() => {
        wheelDelta = 0
      }, 150)

      // Only trigger scroll if delta is significant and not already scrolling
      if (Math.abs(wheelDelta) < 50 || isScrolling) {
        return
      }

      // Prevent default scroll behavior
      e.preventDefault()

      isScrolling = true
      wheelDelta = 0 // Reset delta

      const currentScroll = container.scrollTop
      const sectionHeight = window.innerHeight
      const currentSection = Math.round(currentScroll / sectionHeight)

      let targetSection: number
      if (e.deltaY > 0) {
        // Scrolling down
        targetSection = Math.min(currentSection + 1, 4) // 5 sections (0-4)
      } else {
        // Scrolling up
        targetSection = Math.max(currentSection - 1, 0)
      }

      // Only scroll if we're actually changing sections
      if (targetSection === currentSection) {
        isScrolling = false
        return
      }

      const targetScroll = targetSection * sectionHeight

      // Smooth scroll to target section
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })

      // Reset scrolling flag after animation
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 1000) // Wait for smooth scroll to complete
    }

    // Handle touch events for mobile
    let touchStartY = 0
    let touchEndY = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY
      const deltaTime = Date.now() - touchStartTime
      const threshold = 50 // Minimum swipe distance
      const timeThreshold = 300 // Maximum swipe time (ms)

      // Only trigger if swipe is significant and fast enough
      if (Math.abs(deltaY) < threshold || deltaTime > timeThreshold) {
        return
      }

      if (isScrolling) return

      isScrolling = true
      const currentScroll = container.scrollTop
      const sectionHeight = window.innerHeight
      const currentSection = Math.round(currentScroll / sectionHeight)

      let targetSection: number
      if (deltaY > 0) {
        // Swiping up (scroll down)
        targetSection = Math.min(currentSection + 1, 4)
      } else {
        // Swiping down (scroll up)
        targetSection = Math.max(currentSection - 1, 0)
      }

      // Only scroll if we're actually changing sections
      if (targetSection === currentSection) {
        isScrolling = false
        return
      }

      const targetScroll = targetSection * sectionHeight

      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 1000)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      clearTimeout(scrollTimeout)
      clearTimeout(wheelTimeout)
    }
  }, [])

  return null
}

