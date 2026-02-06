'use client'

export default function SunflowerPetals() {
  const petals = Array.from({ length: 8 }, (_, i) => i)

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {petals.map((i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${(i * 12.5) % 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + i * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

