'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { Youtube, Play, Clock, TrendingUp, ChefHat, Truck, BookOpen } from 'lucide-react'

const categories = [
  { label: 'All', value: 'all', icon: Play },
  { label: 'Trading', value: 'trading', icon: TrendingUp },
  { label: 'Food Biz', value: 'food', icon: ChefHat },
  { label: 'Courier', value: 'courier', icon: Truck },
  { label: 'Playbooks', value: 'playbooks', icon: BookOpen },
]

const videos = [
  { title: 'How to Read a Candlestick Chart (For Beginners)', duration: '14:32', cat: 'trading', views: '4.2K', accent: '#D4AF37' },
  { title: 'My First Medical Courier Contract — What I Learned', duration: '18:45', cat: 'courier', views: '2.8K', accent: '#3B82F6' },
  { title: 'Setting Up a Wing Pop-Up Business From Scratch', duration: '22:10', cat: 'food', views: '6.1K', accent: '#EF4444' },
  { title: 'Support & Resistance: The Only Lesson You Need', duration: '11:20', cat: 'trading', views: '8.7K', accent: '#D4AF37' },
  { title: '5 Income Plays You Can Start This Week', duration: '16:55', cat: 'playbooks', views: '12.3K', accent: '#22C55E' },
  { title: 'Building a Sauce Brand on $500 Budget', duration: '19:00', cat: 'food', views: '3.9K', accent: '#EF4444' },
  { title: 'Courier Route Math: How Much Can You Actually Make?', duration: '13:40', cat: 'courier', views: '5.5K', accent: '#3B82F6' },
  { title: 'Reading Volume: What the Big Money Is Telling You', duration: '20:15', cat: 'trading', views: '7.2K', accent: '#D4AF37' },
]

export default function FreeContentPage() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="chart-bg absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#D4AF37] border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.05)] mb-5">
              Free For You
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5">
              Free <span className="gold-text">Content</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Everything here is free. No gatekeeping. Build your knowledge base and find your lane.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content grid */}
      <section className="pb-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* YouTube link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 glass rounded-2xl border border-[rgba(212,175,55,0.2)] p-6 flex flex-col sm:flex-row items-center gap-4 justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                <Youtube size={22} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white">Watch on YouTube</p>
                <p className="text-sm text-white/50">All videos, shorts, and breakdowns — free forever.</p>
              </div>
            </div>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red text-sm shrink-0"
            >
              <Youtube size={16} />
              Subscribe
            </a>
          </motion.div>

          {/* Video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group glass rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[rgba(212,175,55,0.2)] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Thumbnail placeholder */}
                <div className="relative h-40 bg-gradient-to-br from-[#111] to-[#0A0A0A] border-b border-[rgba(255,255,255,0.05)] flex items-center justify-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-300"
                    style={{ background: `${v.accent}25` }}
                  >
                    <Play size={22} style={{ color: v.accent }} fill={v.accent} />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white/70 text-[10px] font-mono px-2 py-0.5 rounded">
                    {v.duration}
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-snug mb-2">
                    {v.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30 flex items-center gap-1">
                      <Clock size={10} />
                      {v.duration}
                    </span>
                    <span className="text-xs text-white/30">{v.views} views</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
