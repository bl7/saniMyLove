'use client'

import { useState, useEffect, useRef } from 'react'

export default function ScrollDots() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section')
    sectionsRef.current = Array.from(sections) as HTMLElement[]

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionsRef.current.indexOf(entry.target as HTMLElement)
          if (index !== -1) {
            setActiveIndex(index)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section)
      }
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [])

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index]
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Total number of sections (hero, couple photo, feelings, photo, footer)
  const totalSections = 5

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className={`transition-all duration-300 rounded-full ${
            activeIndex === index
              ? 'w-3 h-8 bg-sunflower shadow-[0_0_10px_rgba(246,197,68,0.5)]'
              : 'w-2 h-2 bg-brown/30 hover:bg-brown/50'
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  )
}

