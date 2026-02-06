'use client'

import { useMemo } from 'react'
import ParallaxField from './ParallaxField'

// Single sunflower component with original shapes but new depth system
const Sunflower = ({ x, y, size, petalCount, rotation, delay, height, facingAngle, layer }: {
  x: number
  y: number
  size: number
  petalCount: number
  rotation: number
  delay: number
  height: number
  facingAngle: number
  layer: 'foreground' | 'midground' | 'background'
}) => {
  const centerRadius = size * 0.15
  const petalLength = size * 0.35
  const petalWidth = size * 0.08
  
  // Layer-based opacity and blur
  const layerStyles = {
    foreground: { opacity: 0.9, blur: 0 },
    midground: { opacity: 0.7, blur: 0.3 },
    background: { opacity: 0.5, blur: 0.6 }
  }
  const style = layerStyles[layer]
  
  // Position flower head so it sits ON TOP of the stem
  // Stem top is at y=-height
  // Flower center should be positioned ABOVE the stem top so the flower sits on top
  // The bottom of the flower center (where it connects to stem) should be at y=-height
  // So flower center should be at y=-height + centerRadius
  const flowerHeadY = -height + centerRadius
  
  return (
    <g 
      transform={`translate(${x}, ${y})`}
      style={{
        opacity: style.opacity,
        filter: style.blur > 0 ? `blur(${style.blur}px)` : 'none',
      } as React.CSSProperties}
    >
      {/* Stem - goes from base (y=0) to top (y=-height) */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={-height}
        stroke="#4A3F35"
        strokeWidth={size * (layer === 'foreground' ? 0.12 : layer === 'midground' ? 0.1 : 0.08)}
        opacity={layer === 'foreground' ? 0.7 : layer === 'midground' ? 0.6 : 0.4}
        strokeLinecap="round"
      />
      
      {/* Leaves - original style */}
      <ellipse
        cx={size * 0.15}
        cy={-height * 0.3}
        rx={size * 0.2}
        ry={size * 0.4}
        fill="#2d5016"
        opacity={layer === 'foreground' ? 0.6 : 0.5}
        transform={`rotate(30 ${size * 0.15} ${-height * 0.3})`}
      />
      <ellipse
        cx={-size * 0.15}
        cy={-height * 0.5}
        rx={size * 0.2}
        ry={size * 0.4}
        fill="#2d5016"
        opacity={layer === 'foreground' ? 0.6 : 0.5}
        transform={`rotate(-30 ${-size * 0.15} ${-height * 0.5})`}
      />
      
      {/* Sunflower head - positioned to connect with stem top, only this part sways */}
      {/* Outer group: initial rotation via SVG transform */}
      <g transform={`translate(0, ${flowerHeadY}) rotate(${facingAngle})`}>
        {/* Inner group: animation via CSS transform */}
        <g 
          className="sunflower-head-sway"
          style={{
            transformOrigin: `0 ${centerRadius}px`, // Pivot at bottom of flower center (where it connects to stem)
            animationDelay: `${delay}s`,
          } as React.CSSProperties}
        >
          {/* Dark center - original style */}
          <circle cx="0" cy="0" r={centerRadius * 1.3} fill="#1a1a1a" opacity={layer === 'foreground' ? 0.8 : 0.6} />
          <circle cx="0" cy="0" r={centerRadius} fill="#4A3F35" opacity={layer === 'foreground' ? 0.9 : 0.7} />
          <circle cx="0" cy="0" r={centerRadius * 0.5} fill="#2d1f14" />
          
          {/* Petals - original golden orange style */}
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (360 / petalCount) * i
            const rad = (angle * Math.PI) / 180
            const petalX = Math.cos(rad) * (size * 0.25)
            const petalY = Math.sin(rad) * (size * 0.25)
            const petalRotation = angle
            
            // Original petal colors
            const petalOpacity = layer === 'foreground' ? 0.85 : layer === 'midground' ? 0.75 : 0.65
            const petalColor = i % 3 === 0 ? '#F6C544' : '#FFB84D'
            
            return (
              <ellipse
                key={i}
                cx={petalX}
                cy={petalY}
                rx={petalWidth}
                ry={petalLength}
                fill={petalColor}
                opacity={petalOpacity}
                transform={`rotate(${petalRotation} ${petalX} ${petalY})`}
              />
            )
          })}
        </g>
      </g>
    </g>
  )
}

export default function SunflowerField() {
  // Generate sunflowers with proper depth layers
  const sunflowers = useMemo(() => {
    const field: Array<{
      x: number
      y: number
      size: number
      petalCount: number
      rotation: number
      delay: number
      height: number
      facingAngle: number
      layer: 'foreground' | 'midground' | 'background'
    }> = []
    
    // FOREGROUND - Large, detailed, rich colors - more random spacing
    // Y position is the BASE of the stem, so we need to account for stem height
    for (let i = 0; i < 6; i++) {
      const baseX = 8 + (i * 16)
      const xPos = baseX + (Math.random() * 8 - 4) // More random offset
      const stemHeight = 14 + Math.random() * 6
      field.push({
        x: xPos,
        y: 50, // Stem base at bottom of field
        size: 14 + Math.random() * 4,
        petalCount: 16 + Math.floor(Math.random() * 4),
        rotation: Math.random() * 8 - 4,
        delay: Math.random() * 2,
        height: stemHeight,
        facingAngle: -8 + Math.random() * 16,
        layer: 'foreground',
      })
    }
    
    // MIDGROUND - Medium size, slightly softer - staggered
    for (let i = 0; i < 8; i++) {
      const baseX = 4 + (i * 12)
      const xPos = baseX + (Math.random() * 6 - 3) // More variation
      const stemHeight = 11 + Math.random() * 4
      field.push({
        x: xPos,
        y: 50, // Stem base at bottom
        size: 10 + Math.random() * 3,
        petalCount: 14 + Math.floor(Math.random() * 3),
        rotation: Math.random() * 6 - 3,
        delay: Math.random() * 2,
        height: stemHeight,
        facingAngle: -6 + Math.random() * 12,
        layer: 'midground',
      })
    }
    
    // MID-BACKGROUND - Smaller, lighter - more organic spacing
    for (let row = 0; row < 2; row++) {
      const baseY = 50 - (row * 1.5) // Slightly higher for depth
      for (let i = 0; i < 10; i++) {
        const baseX = 2 + (i * 10)
        const xPos = baseX + (Math.random() * 5 - 2.5) // Break up alignment
        const stemHeight = 8 + Math.random() * 3 - (row * 1)
        field.push({
          x: xPos,
          y: baseY + Math.random() * 0.5,
          size: 7 + Math.random() * 2,
          petalCount: 12 + Math.floor(Math.random() * 3),
          rotation: Math.random() * 4 - 2,
          delay: Math.random() * 2,
          height: stemHeight,
          facingAngle: -4 + Math.random() * 8,
          layer: 'midground',
        })
      }
    }
    
    // BACKGROUND - Small, very light, near horizon - organic pattern
    for (let row = 0; row < 3; row++) {
      const baseY = 47 - (row * 2) // Higher up for background perspective
      for (let i = 0; i < 12; i++) {
        const baseX = 0 + (i * 8.5)
        const xPos = baseX + (Math.random() * 4 - 2) // Natural variation
        const stemHeight = 5 + Math.random() * 2 - (row * 0.4)
        field.push({
          x: xPos,
          y: baseY + Math.random() * 0.5,
          size: 4 + Math.random() * 2 - (row * 0.3),
          petalCount: 10 + Math.floor(Math.random() * 2),
          rotation: Math.random() * 3 - 1.5,
          delay: Math.random() * 2,
          height: stemHeight,
          facingAngle: -2 + Math.random() * 4,
          layer: 'background',
        })
      }
    }
    
    // Add some scattered flowers to break up patterns
    for (let i = 0; i < 8; i++) {
      const randomLayer = Math.random() < 0.4 ? 'foreground' : Math.random() < 0.7 ? 'midground' : 'background'
      const layerY = randomLayer === 'foreground' ? 50 :
                     randomLayer === 'midground' ? 49 + Math.random() * 1 :
                     46 + Math.random() * 2
      const layerSize = randomLayer === 'foreground' ? 12 + Math.random() * 3 :
                        randomLayer === 'midground' ? 8 + Math.random() * 2 :
                        4 + Math.random() * 2
      
      field.push({
        x: Math.random() * 100, // Completely random X
        y: layerY,
        size: layerSize,
        petalCount: randomLayer === 'foreground' ? 14 + Math.floor(Math.random() * 4) :
                    randomLayer === 'midground' ? 12 + Math.floor(Math.random() * 3) :
                    10 + Math.floor(Math.random() * 2),
        rotation: Math.random() * 6 - 3,
        delay: Math.random() * 2,
        height: randomLayer === 'foreground' ? 12 + Math.random() * 4 :
                randomLayer === 'midground' ? 9 + Math.random() * 3 :
                5 + Math.random() * 2,
        facingAngle: -5 + Math.random() * 10,
        layer: randomLayer,
      })
    }
    
    return field
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, overflow: 'hidden' }}>
      {/* Sky - top 50vh */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-orange-300/40 via-yellow-200/30 to-orange-100/20"></div>
      
      {/* Ground base with subtle shading */}
      <div className="absolute top-1/2 left-0 right-0 bottom-0 bg-gradient-to-b from-cream/20 to-cream/5"></div>
      
      {/* Horizon line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brown/20 to-transparent transform -translate-y-1/2"></div>
      
      {/* Haze near horizon for blending */}
      <div className="absolute top-1/2 left-0 right-0 h-8 bg-gradient-to-b from-transparent via-cream/30 to-transparent transform -translate-y-full"></div>
      
      {/* Gradient mask to blend field top */}
      <div 
        className="absolute top-1/2 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255, 248, 238, 0.8), rgba(255, 248, 238, 1))',
          transform: 'translateY(-100%)',
          zIndex: 1,
        }}
      />
      
      {/* Sunflower field - bottom 50vh only */}
      <div className="absolute top-1/2 left-0 right-0 bottom-0 sunflower-field-container" style={{ overflow: 'visible' }}>
        <ParallaxField>
        <svg
          viewBox="0 0 100 50"
          className="w-full h-full"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
          preserveAspectRatio="none"
        >
          {/* Render by layer for proper depth */}
          {['background', 'midground', 'foreground'].map(layer => (
            <g key={layer}>
              {sunflowers
                .filter(s => s.layer === layer)
                .map((sunflower, index) => (
                  <Sunflower
                    key={`${layer}-${index}`}
                    x={sunflower.x}
                    y={sunflower.y}
                    size={sunflower.size}
                    petalCount={sunflower.petalCount}
                    rotation={sunflower.rotation}
                    delay={sunflower.delay}
                    height={sunflower.height}
                    facingAngle={sunflower.facingAngle}
                    layer={sunflower.layer}
                  />
                ))}
            </g>
          ))}
        </svg>
        </ParallaxField>
      </div>
    </div>
  )
}
