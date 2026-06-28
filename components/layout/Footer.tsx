import Link from 'next/link'

const DISTRICTS = [
  { href: '/market-marina', label: 'Market Marina' },
  { href: '/route-harbor', label: 'Route Harbor' },
  { href: '/flavor-district', label: 'Flavor District' },
  { href: '/blueprint-bay', label: 'Blueprint Bay' },
  { href: '/creator-pier', label: 'Creator Pier' },
  { href: '/library-vault', label: 'Library Vault' },
  { href: '/legacy-point', label: 'Legacy Point' },
  { href: '/founder-island', label: 'Founder Island' },
  { href: '/fantasy-island', label: 'Fantasy Island' },
]

const SOCIALS = [
  { href: 'https://www.youtube.com/@mysterycartel', label: 'YouTube' },
  { href: 'https://www.instagram.com/mystermyself', label: 'Instagram' },
  { href: 'https://x.com/mystermyself', label: 'X' },
  { href: '/follow-the-coast', label: 'Rumble' },
]

export default function Footer() {
  return (
    <footer className="bg-[#060608] border-t border-[#C9A84C]/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-[#C9A84C] text-lg tracking-wider mb-3">
              MYSTERMYSELF
            </h3>
            <p className="text-[#F5F0E8]/60 text-sm leading-relaxed">
              Nine districts. One system. Your legacy.
            </p>
            <p className="text-[#F5F0E8]/60 text-sm mt-2">
              @mysterycartel
            </p>
            <p className="font-mono text-[#C9A84C]/80 text-xs mt-4 tracking-wide">
              TCU MASTER LAW: No Sweep. No Shift. No Trade.
            </p>
          </div>

          {/* Districts */}
          <div>
            <h4 className="text-[#F5F0E8] text-sm font-semibold mb-3 tracking-wide">
              DISTRICTS
            </h4>
            <ul className="space-y-2">
              {DISTRICTS.map((district) => (
                <li key={district.href}>
                  <Link
                    href={district.href}
                    className="text-[#F5F0E8]/50 text-sm hover:text-[#C9A84C] transition-colors"
                  >
                    {district.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links + Socials */}
          <div>
            <h4 className="text-[#F5F0E8] text-sm font-semibold mb-3 tracking-wide">
              CONNECT
            </h4>
            <ul className="space-y-2">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <Link
                    href={social.href}
                    className="text-[#F5F0E8]/50 text-sm hover:text-[#C9A84C] transition-colors"
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {social.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/opportunity-list"
                className="inline-block bg-[#C9A84C] text-[#060608] px-4 py-2 text-xs font-bold tracking-wider rounded hover:bg-[#C9A84C]/90 transition-colors"
              >
                JOIN THE OPPORTUNITY LIST
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#C9A84C]/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#F5F0E8]/30 text-xs">
            &copy; {new Date().getFullYear()} MysterMyself · Scott-King Coast
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-[#F5F0E8]/30 text-xs hover:text-[#F5F0E8]/50">
              Terms
            </Link>
            <Link href="/privacy" className="text-[#F5F0E8]/30 text-xs hover:text-[#F5F0E8]/50">
              Privacy
            </Link>
            <Link href="/disclaimer" className="text-[#F5F0E8]/30 text-xs hover:text-[#F5F0E8]/50">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
