'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { TCUCharacter } from '@/data/tcu-character-canon'

/**
 * TCUAvatarPlaceholder — Premium character avatar with auto-swap.
 *
 * When a PNG exists at /public/characters/{id}.png, it displays the real image.
 * When no PNG exists, it renders a premium CSS/SVG placeholder:
 * - Color ring matching character accent
 * - Emoji as center element
 * - Character initial in Bebas Neue (background)
 * - Subtle pulse on hover
 * - Art badge indicator
 *
 * Sizes: sm (48px), md (80px), lg (120px), hero (200px)
 */

type AvatarSize = 'sm' | 'md' | 'lg' | 'hero'

interface Props {
  character: TCUCharacter
  size?: AvatarSize
  showBadge?: boolean
  className?: string
}

const SIZE_MAP: Record<AvatarSize, number> = {
  sm: 48,
  md: 80,
  lg: 120,
  hero: 200,
}

const EMOJI_SIZE: Record<AvatarSize, string> = {
  sm: '1.2rem',
  md: '2rem',
  lg: '3rem',
  hero: '5rem',
}

const INITIAL_SIZE: Record<AvatarSize, string> = {
  sm: '2rem',
  md: '3.5rem',
  lg: '5rem',
  hero: '8rem',
}

const RING_WIDTH: Record<AvatarSize, number> = {
  sm: 2,
  md: 3,
  lg: 4,
  hero: 5,
}

export default function TCUAvatarPlaceholder({
  character,
  size = 'md',
  showBadge = true,
  className = '',
}: Props) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const px = SIZE_MAP[size]
  const ringW = RING_WIDTH[size]

  // Try to load the real image — fallback to placeholder on error
  const hasRealImage = !imgError

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
      style={{
        position: 'relative',
        width: px,
        height: px,
        flexShrink: 0,
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          inset: -ringW,
          borderRadius: '50%',
          border: `${ringW}px solid ${character.color}40`,
          boxShadow: `0 0 ${px * 0.15}px ${character.color}20, inset 0 0 ${px * 0.1}px ${character.color}10`,
        }}
      />

      {/* Inner container */}
      <div
        style={{
          width: px,
          height: px,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          background: `radial-gradient(ellipse at 30% 30%, ${character.color}15 0%, #0d0d10 70%)`,
          border: `1px solid ${character.color}30`,
        }}
      >
        {/* Background initial (always rendered behind) */}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: INITIAL_SIZE[size],
            color: `${character.color}12`,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {character.name[0]}
        </span>

        {/* Gold dot pattern background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${character.color}08 1px, transparent 1px)`,
            backgroundSize: `${Math.max(8, px * 0.08)}px ${Math.max(8, px * 0.08)}px`,
            pointerEvents: 'none',
          }}
        />

        {/* Real image (loads if PNG exists, hidden until loaded) */}
        {hasRealImage && (
          <Image
            src={character.imagePath}
            alt={character.name}
            width={px}
            height={px}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: imgLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              zIndex: 3,
            }}
            onError={() => setImgError(true)}
            onLoad={() => setImgLoaded(true)}
            unoptimized
          />
        )}

        {/* Emoji center (shown when image hasn't loaded) */}
        {!imgLoaded && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: EMOJI_SIZE[size],
              lineHeight: 1,
              zIndex: 2,
              filter: `drop-shadow(0 0 8px ${character.color}40)`,
            }}
          >
            {character.emoji}
          </span>
        )}
      </div>

      {/* Art badge — indicates placeholder status */}
      {showBadge && !imgLoaded && size !== 'sm' && (
        <div
          style={{
            position: 'absolute',
            bottom: size === 'hero' ? 8 : 2,
            right: size === 'hero' ? 8 : 0,
            background: 'rgba(6,6,8,0.9)',
            border: `1px solid ${character.color}40`,
            borderRadius: 4,
            padding: size === 'hero' ? '4px 8px' : '2px 5px',
            fontSize: size === 'hero' ? '0.6rem' : '0.45rem',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            zIndex: 4,
          }}
        >
          <span style={{ fontSize: size === 'hero' ? '0.7rem' : '0.5rem' }}>🎨</span>
          {size === 'hero' && (
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.4rem',
              color: 'rgba(245,240,232,0.4)',
              letterSpacing: '0.05em',
            }}>
              Character art coming
            </span>
          )}
        </div>
      )}
    </motion.div>
  )
}
