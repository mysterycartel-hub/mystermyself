'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface JournalEntry {
  id: number
  date: string
  pair: string
  setup: string
  result: 'Win' | 'Loss' | 'Breakeven' | 'Missed'
  notes: string
  lesson: string
}

const RESULTS = ['Win', 'Loss', 'Breakeven', 'Missed'] as const
const RESULT_COLORS = { Win: '#22C55E', Loss: '#c0392b', Breakeven: '#c9a84c', Missed: '#94A3B8' }

const STORAGE_KEY = 'tcu_journal_entries'

function loadEntriesFromStorage(): JournalEntry[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveEntriesToStorage(entries: JournalEntry[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch { /* storage full or unavailable */ }
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    pair: '',
    setup: '',
    result: 'Win' as JournalEntry['result'],
    notes: '',
    lesson: '',
  })
  const [saved, setSaved] = useState(false)
  const [saveMode, setSaveMode] = useState<'local' | 'cloud'>('local')
  const [mounted, setMounted] = useState(false)

  // Load entries on mount
  useEffect(() => {
    setMounted(true)
    loadEntries()
  }, [])

  async function loadEntries() {
    // Attempt Supabase load first
    try {
      const { getSupabaseClient } = await import('@/lib/supabase')
      const supabase = getSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('journal_entries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
        if (!error && data && data.length > 0) {
          const mapped: JournalEntry[] = data.map((row: { id: number; date: string; pair: string; setup: string; result: string; notes: string; lesson: string }) => ({
            id: row.id,
            date: row.date,
            pair: row.pair,
            setup: row.setup,
            result: row.result as JournalEntry['result'],
            notes: row.notes || '',
            lesson: row.lesson || '',
          }))
          setEntries(mapped)
          setSaveMode('cloud')
          return
        }
      }
    } catch {
      // Supabase not configured or query failed - fall through to localStorage
    }

    // Fallback to localStorage
    const localEntries = loadEntriesFromStorage()
    setEntries(localEntries)
    setSaveMode('local')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: 'var(--black)',
    border: '1px solid rgba(201,168,76,0.15)',
    color: 'var(--cream)',
    fontFamily: '"Space Mono", monospace',
    fontSize: '0.72rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.pair || !form.setup) return

    const newEntry: JournalEntry = { ...form, id: Date.now() }
    const updatedEntries = [newEntry, ...entries]
    setEntries(updatedEntries)

    // Always save to localStorage
    saveEntriesToStorage(updatedEntries)

    // Attempt Supabase save
    try {
      const { getSupabaseClient } = await import('@/lib/supabase')
      const supabase = getSupabaseClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('journal_entries').insert({
          user_id: user.id,
          date: newEntry.date,
          pair: newEntry.pair,
          setup: newEntry.setup,
          result: newEntry.result,
          notes: newEntry.notes,
          lesson: newEntry.lesson,
        })
        setSaveMode('cloud')
      }
    } catch {
      // Supabase not available - already saved to localStorage
      setSaveMode('local')
    }

    setForm(f => ({ ...f, pair: '', setup: '', notes: '', lesson: '' }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <main>
      <Navbar />

      <section style={{
        minHeight: '100vh',
        background: 'var(--black)',
        padding: '120px 48px 80px',
        position: 'relative',
      }}>
        <div className="hero-grid" style={{ opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto' }}>

          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <Link href="/dashboard" style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'rgba(201,168,76,0.5)',
                textDecoration: 'none',
              }}>
                ← Dashboard
              </Link>
              <Link href="/chart-kitchen" style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'rgba(201,168,76,0.5)',
                textDecoration: 'none',
              }}>
                Chart Kitchen →
              </Link>
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.52rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.5)',
              marginBottom: 12,
            }}>
              Trading Chef · Session Notes
            </div>
            <h1 style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3rem, 5vw, 4rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
            }}>
              TRADE <span style={{ color: 'var(--gold)' }}>JOURNAL</span>
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'flex-start' }}>

            {/* Form */}
            <div style={{ background: 'var(--deep)', border: '1px solid rgba(201,168,76,0.1)', padding: '36px 32px' }}>
              <h2 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.2rem',
                letterSpacing: '0.05em',
                color: 'var(--gold)',
                marginBottom: 24,
              }}>
                Log a Session
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: 6 }}>Date</label>
                    <input type="date" value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.15)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: 6 }}>Pair / Asset</label>
                    <input type="text" value={form.pair} onChange={(e) => setForm(f => ({ ...f, pair: e.target.value }))} placeholder="XAUUSD" required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.15)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: 6 }}>Setup Description</label>
                  <input type="text" value={form.setup} onChange={(e) => setForm(f => ({ ...f, setup: e.target.value }))} placeholder="BOS + FVG confluence at NY open..." required style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.15)' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: 6 }}>Outcome</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {RESULTS.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, result: r }))}
                        style={{
                          padding: '10px 6px',
                          background: form.result === r ? `${RESULT_COLORS[r]}20` : 'transparent',
                          border: `1px solid ${form.result === r ? RESULT_COLORS[r] : 'rgba(245,240,232,0.1)'}`,
                          color: form.result === r ? RESULT_COLORS[r] : 'rgba(245,240,232,0.35)',
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.5rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: 6 }}>Session Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="What did you see? What happened?" rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.15)' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontFamily: '"Space Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', marginBottom: 6 }}>Key Lesson</label>
                  <input type="text" value={form.lesson} onChange={(e) => setForm(f => ({ ...f, lesson: e.target.value }))} placeholder="What will you do differently?" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = 'var(--gold)' }} onBlur={(e) => { e.target.style.borderColor = 'rgba(201,168,76,0.15)' }} />
                </div>

                <button type="submit" style={{
                  width: '100%',
                  background: 'var(--gold)',
                  color: '#060608',
                  padding: '14px',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  {saved ? 'Logged ✓' : 'Log Session →'}
                </button>
              </form>
            </div>

            {/* Entries */}
            <div>
              <h2 style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: '1.2rem',
                letterSpacing: '0.05em',
                color: 'rgba(245,240,232,0.5)',
                marginBottom: 20,
              }}>
                Session Log ({mounted ? entries.length : 0})
              </h2>

              {entries.length === 0 ? (
                <div style={{
                  background: 'var(--deep)',
                  border: '1px solid rgba(201,168,76,0.06)',
                  padding: '48px 32px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>📓</div>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.6rem',
                    color: 'rgba(245,240,232,0.25)',
                    letterSpacing: '0.08em',
                  }}>
                    No entries yet. Log your first session.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {entries.map((entry) => (
                    <div key={entry.id} style={{
                      background: 'var(--deep)',
                      border: `1px solid ${RESULT_COLORS[entry.result]}20`,
                      padding: '20px 24px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: '1rem',
                          letterSpacing: '0.04em',
                          color: 'var(--cream)',
                        }}>
                          {entry.pair}
                        </div>
                        <span style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: '0.52rem',
                          letterSpacing: '0.12em',
                          color: RESULT_COLORS[entry.result],
                          textTransform: 'uppercase',
                        }}>
                          {entry.result}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'rgba(245,240,232,0.5)', lineHeight: 1.6, marginBottom: 4 }}>{entry.setup}</div>
                      {entry.lesson && (
                        <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.55rem', color: 'rgba(201,168,76,0.5)', lineHeight: 1.5 }}>
                          Lesson: {entry.lesson}
                        </div>
                      )}
                      <div style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.48rem', color: 'rgba(245,240,232,0.2)', marginTop: 8 }}>{entry.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Save mode banner */}
          <div style={{
            marginTop: 32,
            padding: '16px 20px',
            background: saveMode === 'cloud' ? 'rgba(34,197,94,0.04)' : 'rgba(201,168,76,0.04)',
            border: `1px solid ${saveMode === 'cloud' ? 'rgba(34,197,94,0.15)' : 'rgba(201,168,76,0.08)'}`,
            fontSize: '0.58rem',
            fontFamily: '"Space Mono", monospace',
            color: 'rgba(245,240,232,0.35)',
            lineHeight: 1.6,
          }}>
            {saveMode === 'cloud' ? (
              <>✅ Cloud sync active. Entries are saved to your account.</>
            ) : (
              <>💾 Currently saving locally. Connect Supabase for cloud sync.</>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
