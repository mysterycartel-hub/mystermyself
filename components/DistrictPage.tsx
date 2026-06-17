import Link from 'next/link'
import { BEEHIIV_SIGNUP_URL, routes } from '@/lib/site'

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function DistrictPage({
  name,
  eyebrow,
  headline,
  copy,
  bullets,
  accent = '#C9A84C',
  primary = 'Join The Opportunity List',
  productHref,
  productText,
}: {
  name: string
  eyebrow: string
  headline: string
  copy: string
  bullets: string[]
  accent?: string
  primary?: string
  productHref?: string
  productText?: string
}) {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-5 py-10 text-[#E8E8F0]">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-bold text-[#C9A84C]">← Back to Scott-King Coast</Link>
        <section className="py-16">
          <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>{eyebrow}</p>
          <h1 className="mt-4 text-5xl font-black md:text-7xl" style={{ color: accent }}>{name}</h1>
          <h2 className="mt-5 text-3xl font-black md:text-5xl">{headline}</h2>
          <p className="mt-6 max-w-3xl text-lg text-white/70">{copy}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={BEEHIIV_SIGNUP_URL} {...external} className="inline-flex rounded-full bg-[#C9A84C] px-6 py-3 text-sm font-black text-black">{primary}</a>
            {productHref && productText ? (
              <Link href={productHref} className="inline-flex rounded-full border border-[#C9A84C]/60 px-6 py-3 text-sm font-bold text-[#C9A84C]">{productText}</Link>
            ) : null}
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-2">
          {bullets.map((b) => (
            <div key={b} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-white/75">{b}</p>
            </div>
          ))}
        </section>
        <footer className="mt-16 border-t border-white/10 py-8 text-sm text-white/60">
          <div className="flex flex-wrap gap-4">
            <Link href="/">Home</Link>
            <a href={BEEHIIV_SIGNUP_URL} {...external}>Subscribe</a>
            <Link href={routes.medicalCourierGuide}>Medical Courier Guide</Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
