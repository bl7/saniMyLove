'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

const memories = [
  {
    caption: 'The day we met',
    image: '/firstmovieDate.jpeg',
  },
  {
    caption: 'Our first photo',
    image: '/together.jpg',
  },
  {
    caption: 'Our first trip',
    image: '/onGoaBeach.jpeg',
  },
  {
    caption: 'At Adi Yogi',
    image: '/atAdiYogi.jpeg',
  },
  {
    caption: 'From Goa',
    image: '/fromGoa.jpeg',
  },
  {
    caption: 'The big day',
    image: '/theBigDay.jpeg',
  },
  {
    caption: 'Asleep in her arms',
    image: '/asleepInHerArms.jpeg',
  },
  {
    caption: 'Recent one',
    image: '/recentOne.jpg',
  },
  {
    caption: 'Forever ❤️',
    image: '/firstFlight.jpeg',
  },
]

export default function Timeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Mouse events for desktop drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  // Touch events for mobile swipe
  let touchStartX = 0
  let touchStartScrollLeft = 0

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    touchStartX = e.touches[0].clientX
    touchStartScrollLeft = scrollContainerRef.current.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    const touchX = e.touches[0].clientX
    const walk = (touchX - touchStartX) * 1.5
    scrollContainerRef.current.scrollLeft = touchStartScrollLeft - walk
  }

  return (
    <div className="relative w-full py-6 md:py-12">
      <h2 className="font-script text-2xl sm:text-3xl md:text-4xl text-brown text-center mb-8 md:mb-12 mt-4 md:mt-8 lg:mt-12 px-4 animate-fade-in">
        Our little timeline
      </h2>
      <div
        ref={scrollContainerRef}
        className="relative overflow-x-scroll snap-x snap-mandatory scroll-smooth pb-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {/* Left fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
        {/* Right fade edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

        <div className="flex items-center space-x-4 md:space-x-8 px-4 md:px-12 relative" style={{ minHeight: '400px', paddingTop: '60px', paddingBottom: '60px', position: 'relative' }}>
          {/* Timeline line - horizontal line connecting all memories - spans full content width */}
          <div className="absolute top-1/2 bg-gradient-to-r from-sunflower/30 via-sunflower/50 to-sunflower/30 transform -translate-y-1/2 z-0 hidden md:block" style={{ height: '3px', borderRadius: '2px', left: '16px', width: `calc(${memories.length * 200}px + ${(memories.length - 1) * 16}px + ${memories.length * 8}px)` }}></div>
          <div className="absolute top-1/2 bg-gradient-to-r from-sunflower/30 via-sunflower/50 to-sunflower/30 transform -translate-y-1/2 z-0 block md:hidden" style={{ height: '2px', borderRadius: '2px', left: '16px', width: `calc(${memories.length * 200}px + ${(memories.length - 1) * 16}px + ${memories.length * 8}px)` }}></div>
          {memories.map((memory, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center flex flex-col items-center relative"
              style={{ width: '200px' }}
            >
              {/* Memory card - positioned above or below the line alternately */}
              <div 
                className="relative"
                style={{ 
                  marginBottom: index % 2 === 0 ? '0' : '120px',
                  marginTop: index % 2 === 0 ? '120px' : '0',
                }}
              >
                <div className="bg-cream rounded-2xl shadow-lg overflow-hidden border-2 border-sunflower/30 timeline-card-hover" style={{ maxWidth: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="relative" style={{ width: '100%', height: 'auto' }}>
                    <img
                      src={memory.image}
                      alt={memory.caption}
                      className="w-full h-auto rounded-2xl"
                      style={{ display: 'block', maxHeight: '220px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Timeline dot on the line - positioned at center */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-4 h-4 md:w-5 md:h-5 bg-sunflower rounded-full border-2 md:border-4 border-cream shadow-lg"
                style={{ top: '50%' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

