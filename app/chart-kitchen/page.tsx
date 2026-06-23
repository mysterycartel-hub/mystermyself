'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { KITCHEN_SYMBOLS, TIMEFRAMES, DEFAULT_SYMBOL, DEFAULT_TIMEFRAME, KitchenSymbol, Timeframe } from '@/lib/kitchen'
import { TCUCoachAnalysis } from '@/lib/aiCoach'
import Watchlist from '@/components/kitchen/Watchlist'
import AnalyzeButton from '@/components/kitchen/AnalyzeButton'
import SaveToJournal from '@/components/kitchen/SaveToJournal'
import CharacterLessons from '@/components/kitchen/CharacterLessons'
import BiasPanel from '@/components/kitchen/BiasPanel'

// Dynamic import for lightweight-charts (no SSR)
const CandlestickChart = dynamic(
  () => import('@/components/kitchen/CandlestickChart'),
  { ssr: false, loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#060608',
      fontFamily: '"Space Mono", monospace',
      fontSize: '0.5rem',
      color: 'rgba(201,168,76,0.4)',
      letterSpacing: '0.15em',
    }}>
      Initializing chart...
    </div>
  )}
)

export default function ChartKitchenPage() {
  const [activeSymbol, setActiveSymbol] = useState<KitchenSymbol>(DEFAULT_SYMBOL)
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>(DEFAULT_TIMEFRAME)
  const [analysis, setAnalysis] = useState<TCUCoachAnalysis | null>(null)

  const handleAnalysisComplete = useCallback((result: TCUCoachAnalysis) => {
    setAnalysis(result)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060608',
      color: 'var(--cream, #f5f0e8)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── Top Navigation Bar ────────────────────────────────────── */}
      <header style={{
        background: 'rgba(6,6,8,0.95)',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        flexShrink: 0,
        zIndex: 100,
      }}>
        {/* Left: Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.2rem' }}>👨‍🍳</span>
          <div>
            <div style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1rem',
              color: '#c9a84c',
              letterSpacing: '0.06em',
              lineHeight: 1,
            }}>
              TCU Market Kitchen Terminal
            </div>
            <div style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.36rem',
              color: 'rgba(245,240,232,0.25)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Trading Chef Universe
            </div>
          </div>
        </div>

        {/* Center: Current symbol info + price */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.2rem',
            color: 'var(--cream, #f5f0e8)',
            letterSpacing: '0.04em',
          }}>
            {activeSymbol.short}
          </div>
          <div style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.44rem',
            color: 'rgba(201,168,76,0.6)',
            letterSpacing: '0.1em',
            padding: '3px 8px',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.12)',
          }}>
            {activeTimeframe.label}
          </div>

          {/* Action buttons */}
          <AnalyzeButton
            symbol={activeSymbol.short}
            timeframe={activeTimeframe.value}
            onAnalysisComplete={handleAnalysisComplete}
          />
          <SaveToJournal
            symbol={activeSymbol.short}
            timeframe={activeTimeframe.value}
            analysis={analysis}
          />
        </div>

        {/* Right: Navigation links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          {[
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/journal', label: 'Journal' },
            { href: '/missions', label: 'Missions' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.42rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.35)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── Main Content Area ─────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        minHeight: 0,
      }}
        className="kitchen-main"
      >
        {/* Left Sidebar: Watchlist */}
        <div className="kitchen-sidebar-left" style={{
          flexShrink: 0,
        }}>
          <Watchlist
            activeSymbol={activeSymbol}
            activeTimeframe={activeTimeframe}
            onSymbolChange={setActiveSymbol}
            onTimeframeChange={setActiveTimeframe}
          />
        </div>

        {/* Center: Chart + BiasPanel below */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden',
        }}>
          {/* Chart Area */}
          <div className="kitchen-chart-area" style={{
            flex: 1,
            minHeight: 300,
            position: 'relative',
            borderBottom: '1px solid rgba(201,168,76,0.08)',
          }}>
            <CandlestickChart
              symbol={activeSymbol.short}
              timeframe={activeTimeframe.value}
            />
          </div>

          {/* Bias Panel below chart */}
          <div className="kitchen-bias-area" style={{
            maxHeight: 320,
            overflowY: 'auto',
          }}>
            <BiasPanel symbol={activeSymbol} />
          </div>
        </div>

        {/* Right Sidebar: AI Coach panel + Character Lessons */}
        <div className="kitchen-sidebar-right" style={{
          width: 320,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(201,168,76,0.08)',
          overflow: 'hidden',
        }}>
          {/* AI Coach Results */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {analysis ? (
              <div style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}>
                {/* Coach header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  paddingBottom: 10,
                  borderBottom: '1px solid rgba(201,168,76,0.08)',
                }}>
                  <span style={{ fontSize: '1rem' }}>👨‍🍳</span>
                  <div>
                    <div style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '0.8rem',
                      color: '#c9a84c',
                      letterSpacing: '0.06em',
                      lineHeight: 1,
                    }}>
                      Chef Goldie - AI Coach
                    </div>
                    <div style={{
                      fontFamily: '"Space Mono", monospace',
                      fontSize: '0.36rem',
                      color: 'rgba(245,240,232,0.2)',
                      letterSpacing: '0.1em',
                      marginTop: 2,
                    }}>
                      {activeSymbol.short} {activeTimeframe.label} Analysis
                    </div>
                  </div>
                </div>

                {/* AI Safe Mode notice */}
                {!process.env.NEXT_PUBLIC_AI_PROVIDER && (
                  <div style={{
                    background: 'rgba(201,168,76,0.04)',
                    border: '1px solid rgba(201,168,76,0.12)',
                    padding: '8px 10px',
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.4rem',
                    color: 'rgba(201,168,76,0.5)',
                    lineHeight: 1.6,
                    letterSpacing: '0.05em',
                  }}>
                    AI Coach — coming soon. Demo analysis shown below.
                  </div>
                )}

                {/* Analysis sections */}
                <AnalysisSection label="Bias" icon="🧭" color="#c9a84c" content={analysis.bias} />
                <AnalysisSection label="Liquidity / Flow" icon="🌊" color="#3B82F6" content={analysis.liquidityMap} />
                <AnalysisSection label="AOI" icon="🎯" color="#F97316" content={analysis.aoi} />
                <AnalysisSection label="Setup Quality" icon="⭐" color="#A855F7" content={analysis.setupQuality} />
                <AnalysisSection label="The Pass (Entry)" icon="🚪" color="#c9a84c" content={analysis.entryIdea} />
                <AnalysisSection label="Burn Point" icon="🔥" color="#EF4444" content={analysis.burnPoint} />
                <AnalysisSection label="Tables Served" icon="🍽️" color="#22C55E" content={analysis.tablesServed} />
                <AnalysisSection label="Invalidation" icon="❌" color="#EF4444" content={analysis.invalidation} />

                {/* Risk note */}
                <div style={{
                  marginTop: 8,
                  padding: '8px 10px',
                  background: 'rgba(239,68,68,0.04)',
                  border: '1px solid rgba(239,68,68,0.1)',
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.38rem',
                  color: 'rgba(245,240,232,0.3)',
                  lineHeight: 1.6,
                }}>
                  {analysis.riskNote}
                </div>

                {/* Character Lessons */}
                <div style={{ marginTop: 8 }}>
                  <CharacterLessons analysis={analysis} />
                </div>
              </div>
            ) : (
              /* Empty state when no analysis yet */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 24px',
                textAlign: 'center',
                flex: 1,
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🍳</div>
                <div style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1rem',
                  color: 'rgba(201,168,76,0.6)',
                  letterSpacing: '0.06em',
                  marginBottom: 8,
                }}>
                  AI Coach Ready
                </div>
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.44rem',
                  color: 'rgba(245,240,232,0.25)',
                  lineHeight: 1.7,
                  maxWidth: 220,
                }}>
                  Click &ldquo;Analyze Chart&rdquo; to get a full TCU-style analysis of {activeSymbol.short} on the {activeTimeframe.label} timeframe.
                </p>
                <div style={{
                  marginTop: 16,
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.38rem',
                  color: 'rgba(245,240,232,0.12)',
                  letterSpacing: '0.08em',
                }}>
                  Bias &bull; Flow &bull; AOI &bull; Pass &bull; Tables
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '8px 16px',
            borderTop: '1px solid rgba(245,240,232,0.04)',
            flexShrink: 0,
          }}>
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.34rem',
              color: 'rgba(245,240,232,0.12)',
              letterSpacing: '0.05em',
            }}>
              Education only &bull; Not financial advice &bull; TCU Canon
            </span>
          </div>
        </div>
      </div>

      {/* ── Responsive Styles ─────────────────────────────────────── */}
      <style>{`
        @media (max-width: 900px) {
          .kitchen-main {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .kitchen-sidebar-left {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(201,168,76,0.08);
          }
          .kitchen-sidebar-left > div {
            width: 100% !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            max-height: 160px !important;
          }
          .kitchen-sidebar-right {
            width: 100% !important;
            border-left: none !important;
            border-top: 1px solid rgba(201,168,76,0.08);
            max-height: none !important;
          }
          .kitchen-chart-area {
            min-height: 350px !important;
          }
          .kitchen-bias-area {
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  )
}

// ── Helper Component: Analysis Section ──────────────────────────────────

function AnalysisSection({
  label,
  icon,
  color,
  content,
}: {
  label: string
  icon: string
  color: string
  content: string
}) {
  if (!content) return null
  return (
    <div style={{
      borderBottom: '1px solid rgba(245,240,232,0.03)',
      paddingBottom: 10,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 5,
      }}>
        <span style={{ fontSize: '0.7rem', lineHeight: 1 }}>{icon}</span>
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.38rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color,
        }}>
          {label}
        </span>
      </div>
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.46rem',
        lineHeight: 1.75,
        color: 'rgba(245,240,232,0.55)',
        margin: 0,
        whiteSpace: 'pre-line',
      }}>
        {content}
      </p>
    </div>
  )
}
