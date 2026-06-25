'use client'

import { useEffect, useRef } from 'react'

/**
 * GoldParticles — Lightweight ambient floating gold dots.
 * Drop into any section for background life. Uses CSS animations (no canvas).
 * Mobile-safe: reduces count on small screens.
 */

interface Props {
  count?: number
  opacity?: number
  speed?: 'slow' | 'medium' | 'fast'
}

export default function GoldParticles({ count = 20, opacity = 0.4, speed = 'slow' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  const duration = speed === 'slow' ? 20 : speed === 'medium' ? 12 : 7

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 3 + 1
        const left = Math.random() * 100
        const delay = Math.random() * duration
        const drift = (Math.random() - 0.5) * 40

        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              bottom: '-5%',
              left: `${left}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `rgba(201, 168, 76, ${opacity * (0.5 + Math.random() * 0.5)})`,
              boxShadow: size > 2 ? `0 0 ${size * 2}px rgba(201, 168, 76, ${opacity * 0.3})` : 'none',
              animation: `goldFloat ${duration + Math.random() * 8}s linear ${delay}s infinite`,
              ['--drift' as string]: `${drift}px`,
            }}
          />
        )
      })}

      <style>{`
        @keyframes goldFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-110vh) translateX(var(--drift, 0px));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
