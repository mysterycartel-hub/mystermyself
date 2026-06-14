'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)
  const mouseX    = useRef(0)
  const mouseY    = useRef(0)
  const ringX     = useRef(0)
  const ringY     = useRef(0)
  const rafRef    = useRef<number>()

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX.current - 6}px, ${mouseY.current - 6}px)`
      }
    }

    const animate = () => {
      ringX.current += (mouseX.current - ringX.current - 18) * 0.12
      ringY.current += (mouseY.current - ringY.current - 18) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX.current}px, ${ringY.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    // Scale on click
    const onDown = () => {
      if (cursorRef.current) cursorRef.current.style.transform += ' scale(0.7)'
    }
    const onUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX.current - 6}px, ${mouseY.current - 6}px)`
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Gold dot */}
      <div
        ref={cursorRef}
        style={{
          width: 12, height: 12,
          background: '#c9a84c',
          borderRadius: '50%',
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transition: 'opacity 0.2s',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          width: 36, height: 36,
          border: '1px solid rgba(201,168,76,0.5)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  )
}
