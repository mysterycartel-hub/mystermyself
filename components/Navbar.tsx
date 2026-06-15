'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home',         href: '/' },
  { label: 'The Coast',    href: '/coast' },
  { label: 'Passport',     href: '/passport' },
  { label: 'Academy',      href: '/academy' },
  { label: 'Kitchen',      href: '/kitchen' },
  { label: 'Trading Chef', href: '/trading-chef' },
  { label: 'TCU',          href: '/trading-chef-university' },
  { label: 'Courier Lab',  href: '/courier-income-lab' },
  { label: 'Breaded',      href: '/breaded' },
  { label: 'Playbooks',    href: '/playbooks' },
  { label: 'Fantasy',      href: '/fantasy' },
  { label: 'Community',    href: '/community' },
  { label: 'About',        href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 500,
        padding: '16px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,6,8,0.96)' : 'linear-gradient(to bottom, rgba(6,6,8,0.95), transparent)',
        backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.5rem',
              letterSpacing: '0.12em',
              color: '#c9a84c',
            }}
          >
            MysterMyself
          </span>
          <span
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.35)',
            }}
          >
            Ecosystem OS
          </span>
        </div>
      </Link>

      {/* Desktop links */}
      <ul
        className="hidden xl:flex"
        style={{ gap: 28, listStyle: 'none', alignItems: 'center' }}
      >
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              style={{
                color: isActive(l.href) ? '#c9a84c' : 'rgba(245,240,232,0.55)',
                textDecoration: 'none',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                fontFamily: '"Space Mono", monospace',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#c9a84c' }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = isActive(l.href) ? '#c9a84c' : 'rgba(245,240,232,0.55)' }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/trading-chef-university#pricing"
        className="hidden xl:inline-block"
        style={{
          background: '#c9a84c',
          color: '#060608',
          padding: '10px 24px',
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          transition: 'background 0.2s, transform 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#f0c96e' }}
        onMouseLeave={(e) => { (e.target as HTMLElement).style.background = '#c9a84c' }}
      >
        Start Here →
      </Link>

      {/* Mobile burger */}
      <button
        onClick={() => setOpen(!open)}
        className="xl:hidden"
        style={{
          background: 'none',
          border: '1px solid rgba(201,168,76,0.3)',
          color: '#c9a84c',
          padding: '8px',
          cursor: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Toggle navigation"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0, right: 0,
              background: 'rgba(6,6,8,0.98)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(201,168,76,0.15)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: '14px 16px',
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: isActive(l.href) ? '#c9a84c' : 'rgba(245,240,232,0.6)',
                      textDecoration: 'none',
                      borderLeft: isActive(l.href) ? '2px solid #c9a84c' : '2px solid transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                style={{ marginTop: 12 }}
              >
                <Link
                  href="/trading-chef-university#pricing"
                  onClick={() => setOpen(false)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Start Here →</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
