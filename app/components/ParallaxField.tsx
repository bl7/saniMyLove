'use client'

import { useEffect, useRef } from 'react'

export default function ParallaxField({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      
      // Very subtle parallax movement
      const moveX = (x - 0.5) * 2 // -1 to 1
      const moveY = (y - 0.5) * 2 // -1 to 1
      
      container.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.2}px)`
    }

    const handleMouseLeave = () => {
      container.style.transform = 'translate(0, 0)'
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ transition: 'transform 0.3s ease-out' }}>
      {children}
    </div>
  )
}

