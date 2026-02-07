'use client'

import { useEffect, useState } from 'react'

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate hearts with random positions and timings
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: i * 0.5 + Math.random() * 2,
      duration: 10 + Math.random() * 5,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-blush text-xl md:text-2xl floating-heart"
          style={{
            left: `${heart.left}%`,
            bottom: '-5%',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  )
}

