'use client'

import Link from 'next/link'
import { SOCIAL, isRealUrl } from '@/lib/social-links'

const coreLinks = [
  { label: 'Home',             href: '/' },
  { label: 'Opportunity List', href: '/opportunity-list' },
  { label: 'Follow The Coast', href: '/follow-the-coast' },
  { label: 'Districts',        href: '/coast' },
  { label: 'Resources',        href: '/resources' },
  { label: 'Products',         href: '/products/medical-courier-guide' },
  { label: 'Contact',          href: `mailto:${SOCIAL.email}` },
]

const districtLinks = [
  { label: 'Route Harbor',   href: '/coast/route-harbor' },
  { label: 'Market Marina',  href: '/coast/market-marina' },
  { label: 'Blueprint Bay',  href: '/coast/blueprint-bay' },
  { label: 'Creator Pier',   href: '/coast/creator-pier' },
  { label: 'Fantasy Island', href: '/coast/fantasy-island' },
  { label: 'Flavor District', href: '/coast/flavor-district' },
  { label: 'Library Vault',  href: '/coast/library-vault' },
  { label: 'Legacy Point',   href: '/coast/legacy-point' },
]

const legalLinks = [
  { label: 'Privacy Policy',      href: '/privacy' },
  { label: 'Terms of Use',        href: '/terms' },
  { label: 'Disclaimer',          href: '/disclaimer' },
  { label: 'Refund Policy',       href: '/refund' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
]

const socialLinks = [
  { label: 'The Opportunity List', href: SOCIAL.beehiivPublication, external: true },
  { label: 'YouTube',              href: SOCIAL.youtube,   external: true },
  { label: 'TikTok',               href: SOCIAL.tiktok,    external: true },
  { label: 'Instagram',            href: SOCIAL.instagram, external: true },
  { label: 'X / Twitter',          href: SOCIAL.x,         external: true },
  { label: 'Rumble',               href: SOCIAL.rumble,    external: true },
]

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const isMissing = href === '[NEEDS OWNER URL]'
  const style: React.CSSProperties = {
    fontSize: '0.72rem',
    color: isMissing ? 'rgba(245,240,232,0.2)' : 'rgba(245,240,232,0.4)',
    textDecoration: 'none',
    fontFamily: '"Space Mono", monospace',
    display: 'block',
    cursor: isMissing ? 'default' : 'pointer',
  }
  if (isMissing) return <span style={style}>{children} ⚠</span>
  if (external || href.startsWith('http') || href.startsWith('mailto')) {
    return <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" style={style} className="footer-link">{children}</a>
  }
  return <Link href={href} style={style} className="footer-link">{children}</Link>
}

export default function Footer() {
  return (
    <>
      <style>{`.footer-link:hover { color: #c9a84c !important; }`}</style>

      <footer style={{
        background: 'var(--black)',
        padding: '64px 48px 40px',
        borderTop: '1px solid rgba(201,168,76,0.1)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px 32px',
          marginBottom: 48,
        }}>
          {/* Brand block */}
          <div style={{ gridColumn: 'span 1', minWidth: 200 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.8rem',
                letterSpacing: '0.1em',
                color: 'var(--gold)',
                display: 'block',
                marginBottom: 4,
              }}>
                MysterMyself
              </span>
            </Link>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.3)',
              display: 'block',
              marginBottom: 6,
            }}>
              Scott-King Coast
            </span>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              display: 'block',
              marginBottom: 16,
            }}>
              One City. One System. Your Legacy.
            </span>
            <p style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.3)', lineHeight: 1.7, maxWidth: 220 }}>
              The complete ecosystem for building skills, income plays, and ownership systems.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, display: 'block' }}>Navigate</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {coreLinks.map((l) => <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Districts */}
          <div>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, display: 'block' }}>Districts</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {districtLinks.map((l) => <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, display: 'block' }}>Connect</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {socialLinks.map((l) => <li key={l.label}><FooterLink href={l.href} external>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, display: 'block' }}>Legal</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {legalLinks.map((l) => <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
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
          <span style={{ fontSize: '0.58rem', color: 'rgba(245,240,232,0.22)', letterSpacing: '0.05em', fontFamily: '"Space Mono", monospace', lineHeight: 1.7 }}>
            © 2026 MysterMyself / Scott-King Coast. All rights reserved.<br />
            Trading involves risk — educational content only, not financial advice.<br />
            <span style={{ color: 'rgba(245,240,232,0.3)' }}>Affiliate Disclosure:</span> MysterMyself may earn a commission from qualifying purchases. This does not affect our content.
          </span>
          {isRealUrl(SOCIAL.x) && (
            <a href={SOCIAL.x} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.1em', textDecoration: 'none', fontFamily: '"Space Mono", monospace' }}
            >
              @mysterycartel
            </a>
          )}
        </div>
      </footer>
    </>
  )
}
