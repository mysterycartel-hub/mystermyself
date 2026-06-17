import { BEEHIIV_SIGNUP_URL, BEEHIIV_PUBLICATION_URL } from '@/lib/site'

export const metadata = {
  title: 'The Opportunity List | MysterMyself',
  description: 'Join the free newsletter for courier income, trading lessons, fantasy updates, AI tools, and business-building drops.',
}

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-5 py-20 text-center text-[#E8E8F0]">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#C9A84C]">The Opportunity List</p>
        <h1 className="mt-4 text-5xl font-black md:text-7xl">Join The Opportunity List</h1>
        <p className="mt-6 text-xl text-white/70">
          Jobs, AI tools, affiliate programs, courier opportunities, fantasy updates, trading resources, and business opportunities delivered free.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={BEEHIIV_SIGNUP_URL} {...external} className="rounded-full bg-[#C9A84C] px-7 py-3 font-black text-black">Subscribe Free</a>
          <a href={BEEHIIV_PUBLICATION_URL} {...external} className="rounded-full border border-[#C9A84C]/60 px-7 py-3 font-bold text-[#C9A84C]">Read Latest Drops</a>
        </div>
      </div>
    </main>
  )
}
