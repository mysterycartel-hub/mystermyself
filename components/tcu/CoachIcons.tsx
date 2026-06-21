'use client'

// Distinct SVG icons for each TCU coach character
// Replaces colored-initial fallbacks with proper visual identity

interface IconProps {
  size?: number
  className?: string
}

// Trading Chef / Chef Maurice — gold chef hat
export function TradingChefIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Trading Chef">
      <path d="M12 2C10.2 2 8.7 3 8 4.5C6.5 4 4.8 4.8 4.3 6.5C3.8 8.2 4.8 9.8 6 10.5C5.9 11 5.8 11.5 5.8 12V16C5.8 16.6 6.3 17 6.8 17H17.2C17.7 17 18.2 16.6 18.2 16V12C18.2 11.5 18.1 11 18 10.5C19.2 9.8 20.2 8.2 19.7 6.5C19.2 4.8 17.5 4 16 4.5C15.3 3 13.8 2 12 2Z" fill="#C9A84C"/>
      <rect x="6" y="17" width="12" height="2" rx="0.5" fill="#A07B2E"/>
      <path d="M9 20H15L14 22H10L9 20Z" fill="#C9A84C" opacity="0.6"/>
    </svg>
  )
}

// Louie the Liquidity — blue water/wave
export function LouieLiquidityIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Louie Liquidity">
      <path d="M12 3C12 3 5 10 5 14.5C5 18.1 8.1 21 12 21C15.9 21 19 18.1 19 14.5C19 10 12 3 12 3Z" fill="#3B82F6" opacity="0.8"/>
      <path d="M12 6C12 6 8 11 8 13.5C8 15.7 9.8 17.5 12 17.5C14.2 17.5 16 15.7 16 13.5C16 11 12 6 12 6Z" fill="#60A5FA" opacity="0.5"/>
    </svg>
  )
}

// Wickie — orange candle/wick
export function WickieIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Wickie">
      <rect x="10" y="8" width="4" height="12" rx="1" fill="#F97316"/>
      <line x1="12" y1="4" x2="12" y2="8" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 2C12 2 10 3.5 10 4.5C10 5.6 10.9 6 12 6C13.1 6 14 5.6 14 4.5C14 3.5 12 2 12 2Z" fill="#FBBF24"/>
      <line x1="12" y1="20" x2="12" y2="22" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// Chef Goldie — gold star
export function ChefGoldieIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Chef Goldie">
      <path d="M12 2L14.9 8.1L21.6 9L16.8 13.7L18 20.3L12 17.1L6 20.3L7.2 13.7L2.4 9L9.1 8.1L12 2Z" fill="#C9A84C"/>
      <path d="M12 6L13.5 9.2L17 9.7L14.5 12.1L15 15.6L12 14L9 15.6L9.5 12.1L7 9.7L10.5 9.2L12 6Z" fill="#F59E0B" opacity="0.6"/>
    </svg>
  )
}

// Candle Kid — purple flame
export function CandleKidIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Candle Kid">
      <path d="M12 2C12 2 7 8 7 13C7 16.9 9.2 20 12 20C14.8 20 17 16.9 17 13C17 8 12 2 12 2Z" fill="#A855F7"/>
      <path d="M12 6C12 6 9.5 10 9.5 13C9.5 15.2 10.6 17 12 17C13.4 17 14.5 15.2 14.5 13C14.5 10 12 6 12 6Z" fill="#C084FC" opacity="0.6"/>
      <ellipse cx="12" cy="21" rx="3" ry="1" fill="#A855F7" opacity="0.3"/>
    </svg>
  )
}

// Rico Rhythm — sessions/clock
export function RicoRhythmIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Rico Rhythm">
      <circle cx="12" cy="12" r="9" stroke="#8B5CF6" strokeWidth="2" fill="#8B5CF6" fillOpacity="0.15"/>
      <line x1="12" y1="6" x2="12" y2="12" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="16" y2="14" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="#8B5CF6"/>
    </svg>
  )
}

// Penny Stacks — risk/money
export function PennyStacksIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Penny Stacks">
      <circle cx="12" cy="12" r="9" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5"/>
      <text x="12" y="16" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#10B981">$</text>
    </svg>
  )
}

// Map character IDs to icons for easy lookup
export const COACH_ICON_MAP: Record<string, React.FC<IconProps>> = {
  'trading-chef': TradingChefIcon,
  'chef-goldie': ChefGoldieIcon,
  'louie-liquidity': LouieLiquidityIcon,
  'wickie': WickieIcon,
  'candle-kid': CandleKidIcon,
  'rico-rhythm': RicoRhythmIcon,
  'penny-stacks': PennyStacksIcon,
}
