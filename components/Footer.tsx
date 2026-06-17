'use client'

import Link from 'next/link'

const divisions = [
  { label: 'Trading Chef',              href: '/trading-chef' },
  { label: 'Trading Chef University',   href: '/trading-chef-university' },
  { label: 'Route Harbor',             href: '/coast/route-harbor' },
  { label: 'Medical Courier Insider Edge', href: '/products/medical-courier-guide/' },
  { label: 'Breaded Or Not?!',          href: '/breaded' },
  { label: 'Money Move Playbooks',      href: '/playbooks' },
  { label: 'Fantasy Draft Bible',       href: '/fantasy' },
]
const SIGNUP_URL = process.env.NEXT_PUBLIC_BEEHIIV_SIGNUP_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com/subscribe'

const quickLinks = [
  { label: 'Home',                       href: '/' },
  { label: 'Subscribe',                  href: SIGNUP_URL },
  { label: 'Route Harbor',               href: '/coast/route-harbor' },
  { label: 'Fantasy Island',             href: '/coast/fantasy-island' },
  { label: 'Medical Courier Guide',      href: '/products/medical-courier-guide' },
  { label: 'Community',                  href: '/community' },
  { label: 'About',                      href: '/about' },
]
const legal = [
  { label: 'Disclaimer',     href: '/about' },
  { label: 'Privacy Policy', href: '/about' },
  { label: 'Terms of Use',   href: '/about' },
  { label: 'Refund Policy',  href: '/about' },
]
const PUBLICATION_URL = process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_URL ?? 'https://maurices-newsletter-b7274b.beehiiv.com'

const socials = [
  { label: 'The Opportunity List', href: PUBLICATION_URL },
  { label: '@mysterycartel',       href: 'https://x.com/mysterycartel' },
  { label: 'YouTube',              href: 'https://youtube.com' },
  { label: 'TikTok',               href: 'https://tiktok.com' },
  { label: 'Instagram',            href: 'https://instagram.com' },
  { label: 'Email Us',             href: 'mailto:mysterycartel@gmail.com' },
]

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const style: React.CSSProperties = {
    fontSize: '0.72rem',
    color: 'rgba(245,240,232,0.4)',
    textDecoration: 'none',
    fontFamily: '"Space Mono", monospace',
    transition: 'color 0.2s',
    display: 'block',
  }
  if (external) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={style} className="footer-link">{children}</a>
  }
  return <Link href={href} style={style} className="footer-link">{children}</Link>
}

export default function Footer() {
  return (
    <>
      {/* Inline style for hover — avoids event handler prop drilling */}
      <style>{`.footer-link:hover { color: #c9a84c !important; }`}</style>

      <footer style={{
        background: 'var(--black)',
        padding: '64px 48px 40px',
        borderTop: '1px solid rgba(201,168,76,0.1)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 48,
          gap: 32,
          flexWrap: 'wrap',
        }}>
          {/* Brand */}
          <div style={{ minWidth: 200 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.8rem',
                letterSpacing: '0.1em',
                color: 'var(--gold)',
                display: 'block',
                marginBottom: 8,
              }}>
                MysterMyself
              </span>
            </Link>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.25)',
              display: 'block',
              marginBottom: 16,
            }}>
              Skills · Plays · Freedom
            </span>
            <p style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.35)', lineHeight: 1.7, maxWidth: 240 }}>
              The complete ecosystem for building skills, finding income plays, and achieving financial freedom.
            </p>
          </div>

          {/* Divisions */}
          <div>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>Divisions</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {divisions.map((l) => <li key={l.href}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>Navigate</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map((l) => <li key={l.href}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>Legal</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {legal.map((l) => <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>Connect</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {socials.map((l) => <li key={l.label}><FooterLink href={l.href} external={l.href.startsWith('http') || l.href.startsWith('mailto')}>{l.label}</FooterLink></li>)}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 32,
          borderTop: '1px solid rgba(201,168,76,0.08)',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <span style={{ fontSize: '0.62rem', color: 'rgba(245,240,232,0.25)', letterSpacing: '0.05em', fontFamily: '"Space Mono", monospace', lineHeight: 1.6 }}>
            © 2026 MysterMyself / Scott-King Coast. All rights reserved. Trading involves risk — educational content only, not financial advice. As an affiliate, MysterMyself may earn from qualifying purchases.
          </span>
          <a href="https://x.com/mysterycartel" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.1em', textDecoration: 'none', fontFamily: '"Space Mono", monospace' }}
          >
            @mysterycartel
          </a>
        </div>
      </footer>
    </>
  )
}
