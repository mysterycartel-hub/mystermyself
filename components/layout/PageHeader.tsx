import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  backHref?: string
  backLabel?: string
  accent?: boolean
}

/**
 * Reusable page header with optional back link and gold glow accent.
 * Canon: Bebas Neue (font-display) for title, brand colors only.
 */
export default function PageHeader({
  title,
  subtitle,
  backHref,
  backLabel = 'Back',
  accent = true,
}: PageHeaderProps) {
  return (
    <header className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gold glow background accent */}
      {accent && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ backgroundColor: '#C9A84C' }}
        />
      )}

      <div className="relative max-w-4xl mx-auto">
        {/* Back link */}
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-[#F5F0E8]/50 text-sm hover:text-[#C9A84C] transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>{backLabel}</span>
          </Link>
        )}

        {/* Title */}
        <h1 className="font-display text-[#F5F0E8] text-4xl sm:text-5xl lg:text-6xl tracking-wide">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-[#F5F0E8]/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
