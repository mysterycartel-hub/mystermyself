'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { heroVideo, districtVideos, socialProofMessages } from '@/data/homepage-videos'

/**
 * Homepage — Video-First Funnel
 * 
 * Simple. Clean. Sells through video.
 * Hero video → District video cards → CTA
 * 
 * To update videos: edit /data/homepage-videos.ts
 */

function SocialProofPopup() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const show = () => {
      const msg = socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)]
      setMessage(msg)
      setVisible(true)
      setTimeout(() => setVisible(false), 3000)
    }
    const interval = setInterval(show, 8000)
    const initial = setTimeout(show, 4000)
    return () => { clearInterval(interval); clearTimeout(initial) }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-up">
      <div className="bg-[#0A0A0C] border border-[#C9A84C]/30 rounded-lg px-5 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="text-lg">⚡</span>
          <div>
            <p className="text-[#F5F0E8] text-sm font-medium">{message}</p>
            <p className="text-[#C9A84C]/50 text-xs mt-0.5">just now</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function VideoEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-[#C9A84C]/20">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          className="absolute inset-0 w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0A0A0C] to-[#060608] hover:from-[#0A0A0C]/90 transition-all cursor-pointer"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#C9A84C] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.4)] hover:scale-110 transition-transform">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#060608] ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-[#F5F0E8]/60 text-xs uppercase tracking-[0.2em] font-mono">
            Watch Now
          </span>
        </button>
      )}
    </div>
  )
}

function DistrictVideoCard({ video }: { video: typeof districtVideos[0] }) {
  return (
    <div className="bg-[#0A0A0C] border border-[#C9A84C]/10 rounded-lg overflow-hidden hover:border-[#C9A84C]/30 transition-all group">
      <VideoEmbed youtubeId={video.youtubeId} title={video.title} />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{video.emoji}</span>
          <span className="text-[#C9A84C]/60 text-xs uppercase tracking-[0.15em] font-mono">
            {video.district}
          </span>
        </div>
        <h3 className="font-['Bebas_Neue'] text-xl text-[#F5F0E8] tracking-wide mb-2">
          {video.title}
        </h3>
        <p className="text-[#F5F0E8]/50 text-sm leading-relaxed mb-4">
          {video.description}
        </p>
        <Link
          href={video.href}
          className="inline-block bg-[#C9A84C] text-[#060608] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] rounded hover:bg-[#C9A84C]/90 transition-colors"
        >
          {video.cta}
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="bg-[#060608] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="text-center mb-10">
          <h1 className="font-['Bebas_Neue'] text-4xl sm:text-6xl lg:text-7xl text-[#F5F0E8] tracking-wide mb-4">
            Welcome to{' '}
            <span className="text-[#C9A84C]">Scott-King Coast</span>
          </h1>
          <p className="text-[#F5F0E8]/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            One ecosystem for trading education, courier income, food, content, AI tools, fantasy, and ownership.
          </p>
        </div>

        {/* Hero Video */}
        <div className="max-w-4xl mx-auto mb-8">
          <VideoEmbed youtubeId={heroVideo.youtubeId} title={heroVideo.title} />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/opportunity-list"
            className="inline-block bg-[#C9A84C] text-[#060608] px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] rounded hover:bg-[#C9A84C]/90 transition-colors shadow-[0_0_30px_rgba(201,168,76,0.2)]"
          >
            Start Here
          </Link>
          <p className="text-[#F5F0E8]/30 text-xs mt-3 font-mono">
            Free. No credit card. Just pick your lane.
          </p>
        </div>
      </section>

      {/* Watch The Coast — District Videos */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="font-['Bebas_Neue'] text-3xl sm:text-5xl text-[#F5F0E8] tracking-wide mb-3">
            Watch <span className="text-[#C9A84C]">The Coast</span>
          </h2>
          <p className="text-[#F5F0E8]/50 text-sm max-w-lg mx-auto">
            Seven districts. Seven income lanes. Pick one and go deep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {districtVideos.map((video) => (
            <DistrictVideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h2 className="font-['Bebas_Neue'] text-3xl sm:text-4xl text-[#F5F0E8] tracking-wide mb-4">
          Ready to <span className="text-[#C9A84C]">Join the Coast</span>?
        </h2>
        <p className="text-[#F5F0E8]/50 text-sm mb-8 max-w-md mx-auto">
          Pick your lane. Get free content. Level up at your own pace. No subscriptions required.
        </p>
        <Link
          href="/opportunity-list"
          className="inline-block bg-[#C9A84C] text-[#060608] px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] rounded hover:bg-[#C9A84C]/90 transition-colors shadow-[0_0_30px_rgba(201,168,76,0.2)]"
        >
          Join the Opportunity List
        </Link>
        <div className="flex justify-center gap-6 mt-8">
          <a href="https://www.youtube.com/@mystermyself" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/40 hover:text-[#C9A84C] text-xs font-mono uppercase tracking-wider transition-colors">
            YouTube
          </a>
          <a href="https://rumble.com/c/mysterycartel" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/40 hover:text-[#C9A84C] text-xs font-mono uppercase tracking-wider transition-colors">
            Rumble
          </a>
          <a href="https://www.instagram.com/mysterycartel/" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/40 hover:text-[#C9A84C] text-xs font-mono uppercase tracking-wider transition-colors">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@mysterycartel" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E8]/40 hover:text-[#C9A84C] text-xs font-mono uppercase tracking-wider transition-colors">
            TikTok
          </a>
        </div>
      </section>

      {/* Social Proof Popup */}
      <SocialProofPopup />

      <Footer />
    </main>
  )
}
