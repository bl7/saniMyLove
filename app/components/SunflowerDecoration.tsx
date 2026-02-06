'use client'

// Different sunflower variations with stems
const SunflowerSVG = ({ size, centerX, centerY, petalCount, rotation, opacity, stemHeight }: {
  size: number
  centerX: number
  centerY: number
  petalCount: number
  rotation: number
  opacity: number
  stemHeight: number
}) => {
  const centerRadius = size * 0.15
  const petalLength = size * 0.35
  const petalWidth = size * 0.08
  
  // Position where stem meets flower head
  const flowerHeadY = centerY - stemHeight
  
  return (
    <g transform={`translate(${centerX}, ${centerY}) rotate(${rotation})`} opacity={opacity}>
      {/* Thin stem */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={-stemHeight}
        stroke="#4A3F35"
        strokeWidth={size * 0.05}
        opacity="0.6"
      />
      
      {/* Small leaf */}
      <ellipse
        cx={size * 0.1}
        cy={-stemHeight * 0.4}
        rx={size * 0.15}
        ry={size * 0.3}
        fill="#2d5016"
        opacity="0.5"
        transform={`rotate(25 ${size * 0.1} ${-stemHeight * 0.4})`}
      />
      
      {/* Sunflower head - positioned at top of stem */}
      <g transform={`translate(0, ${-stemHeight})`}>
        {/* Dark center */}
        <circle cx="0" cy="0" r={centerRadius * 1.2} fill="#4A3F35" opacity="0.5" />
        <circle cx="0" cy="0" r={centerRadius} fill="#4A3F35" opacity="0.7" />
        <circle cx="0" cy="0" r={centerRadius * 0.6} fill="#4A3F35" />
        
        {/* Petals */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (360 / petalCount) * i
          const rad = (angle * Math.PI) / 180
          const petalX = Math.cos(rad) * (size * 0.25)
          const petalY = Math.sin(rad) * (size * 0.25)
          const petalRotation = angle
          
          return (
            <ellipse
              key={i}
              cx={petalX}
              cy={petalY}
              rx={petalWidth}
              ry={petalLength}
              fill="#F6C544"
              transform={`rotate(${petalRotation} ${petalX} ${petalY})`}
            />
          )
        })}
      </g>
    </g>
  )
}

export default function SunflowerDecoration({ position }: { position: 'top-left' | 'bottom-right' | 'top-right' | 'bottom-left' | 'top-center' | 'bottom-center' | 'middle-left' | 'middle-right' }) {
  const positionClasses = {
    'top-left': 'top-16 left-8',
    'top-right': 'top-16 right-8',
    'top-center': 'top-16 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-16 left-8',
    'bottom-right': 'bottom-16 right-8',
    'bottom-center': 'bottom-16 left-1/2 -translate-x-1/2',
    'middle-left': 'top-1/2 -translate-y-1/2 left-8',
    'middle-right': 'top-1/2 -translate-y-1/2 right-8',
  }

  // Bouquet configurations - flowers grouped together like a real bouquet
  // Y positions start higher (30-35) to account for stems and prevent clipping
  // Flowers are clustered closer together (within 20-30 units) to look like a bouquet
  const configs = {
    'top-left': {
      sunflowers: [
        { size: 18, x: 25, y: 35, petals: 12, rotation: 15, opacity: 0.3, animation: 'sway1', stemHeight: 18 },
        { size: 16, x: 35, y: 38, petals: 10, rotation: -20, opacity: 0.28, animation: 'sway2', stemHeight: 16 },
        { size: 14, x: 30, y: 42, petals: 14, rotation: 10, opacity: 0.26, animation: 'sway3', stemHeight: 14 },
        { size: 12, x: 20, y: 40, petals: 11, rotation: -15, opacity: 0.24, animation: 'sway1', stemHeight: 12 },
      ]
    },
    'top-right': {
      sunflowers: [
        { size: 20, x: 75, y: 35, petals: 13, rotation: -15, opacity: 0.32, animation: 'sway2', stemHeight: 20 },
        { size: 16, x: 70, y: 38, petals: 11, rotation: 25, opacity: 0.28, animation: 'sway1', stemHeight: 16 },
        { size: 14, x: 78, y: 41, petals: 10, rotation: -10, opacity: 0.26, animation: 'sway3', stemHeight: 14 },
      ]
    },
    'top-center': {
      sunflowers: [
        { size: 19, x: 50, y: 35, petals: 12, rotation: 5, opacity: 0.3, animation: 'sway1', stemHeight: 19 },
        { size: 17, x: 48, y: 39, petals: 13, rotation: -8, opacity: 0.28, animation: 'sway2', stemHeight: 17 },
        { size: 15, x: 52, y: 42, petals: 11, rotation: 12, opacity: 0.26, animation: 'sway3', stemHeight: 15 },
      ]
    },
    'bottom-left': {
      sunflowers: [
        { size: 22, x: 18, y: 65, petals: 14, rotation: 20, opacity: 0.3, animation: 'sway3', stemHeight: 22 },
        { size: 18, x: 32, y: 70, petals: 12, rotation: -10, opacity: 0.28, animation: 'sway1', stemHeight: 18 },
        { size: 16, x: 25, y: 60, petals: 10, rotation: 30, opacity: 0.26, animation: 'sway2', stemHeight: 16 },
        { size: 14, x: 12, y: 68, petals: 11, rotation: -5, opacity: 0.24, animation: 'sway3', stemHeight: 14 },
      ]
    },
    'bottom-right': {
      sunflowers: [
        { size: 20, x: 72, y: 63, petals: 13, rotation: -25, opacity: 0.31, animation: 'sway2', stemHeight: 20 },
        { size: 17, x: 82, y: 68, petals: 11, rotation: 15, opacity: 0.28, animation: 'sway3', stemHeight: 17 },
        { size: 15, x: 68, y: 58, petals: 9, rotation: -30, opacity: 0.26, animation: 'sway1', stemHeight: 15 },
      ]
    },
    'bottom-center': {
      sunflowers: [
        { size: 21, x: 50, y: 65, petals: 13, rotation: 0, opacity: 0.3, animation: 'sway1', stemHeight: 21 },
        { size: 18, x: 45, y: 70, petals: 12, rotation: -12, opacity: 0.28, animation: 'sway2', stemHeight: 18 },
        { size: 16, x: 55, y: 68, petals: 11, rotation: 8, opacity: 0.26, animation: 'sway3', stemHeight: 16 },
      ]
    },
    'middle-left': {
      sunflowers: [
        { size: 19, x: 22, y: 50, petals: 12, rotation: 18, opacity: 0.3, animation: 'sway1', stemHeight: 19 },
        { size: 16, x: 15, y: 55, petals: 11, rotation: -12, opacity: 0.28, animation: 'sway2', stemHeight: 16 },
        { size: 14, x: 28, y: 58, petals: 10, rotation: 25, opacity: 0.26, animation: 'sway3', stemHeight: 14 },
      ]
    },
    'middle-right': {
      sunflowers: [
        { size: 20, x: 78, y: 48, petals: 13, rotation: -18, opacity: 0.31, animation: 'sway2', stemHeight: 20 },
        { size: 17, x: 85, y: 53, petals: 12, rotation: 12, opacity: 0.28, animation: 'sway1', stemHeight: 17 },
        { size: 15, x: 72, y: 56, petals: 11, rotation: -22, opacity: 0.26, animation: 'sway3', stemHeight: 15 },
      ]
    },
  }

  const config = configs[position]

  return (
    <div className={`absolute ${positionClasses[position]} w-32 h-32 md:w-44 md:h-44 pointer-events-none`} style={{ zIndex: 1, marginTop: '0' }}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {config.sunflowers.map((sunflower, index) => (
          <g
            key={index}
            className={`sunflower-${sunflower.animation}`}
            style={{ transformOrigin: `${sunflower.x}px ${sunflower.y}px` }}
          >
            <SunflowerSVG
              size={sunflower.size}
              centerX={sunflower.x}
              centerY={sunflower.y}
              petalCount={sunflower.petals}
              rotation={sunflower.rotation}
              opacity={sunflower.opacity}
              stemHeight={sunflower.stemHeight}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
