import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LessonShell from '@/components/academy/LessonShell'
import { LESSONS, LESSON_SLUGS } from '@/lib/academy'

export function generateStaticParams() {
  return LESSON_SLUGS.map((slug) => ({ lesson: slug }))
}

export function generateMetadata({ params }: { params: { lesson: string } }) {
  const lesson = LESSONS.find((l) => l.slug === params.lesson)
  if (!lesson) return { title: 'Lesson Not Found' }
  return {
    title: `${lesson.title} | Trading Chef Academy`,
    description: `${lesson.subtitle} — ${lesson.hook.slice(0, 120)}...`,
  }
}

export default function LessonPage({ params }: { params: { lesson: string } }) {
  const lesson = LESSONS.find((l) => l.slug === params.lesson)
  if (!lesson) notFound()

  return (
    <main>
      <Navbar />

      <section style={{
        background: 'var(--black)',
        minHeight: '100vh',
        padding: '120px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" style={{ opacity: 0.25 }} />

        {/* Ghost lesson number */}
        <div style={{
          position: 'absolute',
          right: -20, top: 80,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '28rem',
          color: `${lesson.color}06`,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}>
          {String(lesson.step).padStart(2, '0')}
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <LessonShell lesson={lesson} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
