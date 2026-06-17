import Link from 'next/link'

export const metadata = {
  title: 'Blueprint Bay | Scott-King Coast — MysterMyself',
  description: 'Reserved for AI automation, agents, workflows, dashboards, and operating systems.',
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0F] px-5 py-10 text-[#E8E8F0]">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-bold text-[#C9A84C]">← Back to Scott-King Coast</Link>
        <section className="py-20">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Shell Only</p>
          <h1 className="mt-4 text-5xl font-black text-[#C9A84C] md:text-7xl">Blueprint Bay</h1>
          <p className="mt-6 text-xl text-white/70">
            Reserved for AI automation, agents, workflows, dashboards, and operating systems. This district is intentionally locked until activation.
          </p>
          <button disabled className="mt-8 rounded-full border border-white/20 px-6 py-3 font-bold text-white/40">Coming Soon</button>
        </section>
      </div>
    </main>
  )
}
