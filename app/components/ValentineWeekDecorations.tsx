'use client'

import { valentineThemes } from '../utils/valentinesWeek'

// Floating emojis for each day that are always visible
const dayEmojis = Object.values(valentineThemes).map(theme => theme.emoji)

export default function ValentineWeekDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {dayEmojis.map((emoji, index) => (
        <div
          key={index}
          className="absolute text-2xl md:text-3xl opacity-20 floating-day-emoji"
          style={{
            left: `${10 + (index * 12)}%`,
            top: `${15 + (index % 3) * 25}%`,
            animationDelay: `${index * 0.8}s`,
            animationDuration: `${8 + (index % 3) * 2}s`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  )
}

