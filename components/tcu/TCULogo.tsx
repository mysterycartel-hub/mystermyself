'use client'

// TCU Chef Hat Logo — gold silhouette with TCU text
export default function TCULogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TCU Logo"
    >
      {/* Chef hat silhouette */}
      <path
        d="M24 4C20.5 4 17.5 5.8 16 8.5C13 7.5 9.5 9 8.5 12C7.5 15 9 18 11.5 19.5C11.2 20.5 11 21.5 11 22.5V30C11 31.1 11.9 32 13 32H35C36.1 32 37 31.1 37 30V22.5C37 21.5 36.8 20.5 36.5 19.5C39 18 40.5 15 39.5 12C38.5 9 35 7.5 32 8.5C30.5 5.8 27.5 4 24 4Z"
        fill="#C9A84C"
      />
      {/* Hat band */}
      <rect x="11" y="30" width="26" height="3" rx="1" fill="#A07B2E" />
      {/* TCU text */}
      <text
        x="24"
        y="44"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="8"
        fontWeight="bold"
        letterSpacing="1.5"
        fill="#C9A84C"
      >
        TCU
      </text>
    </svg>
  )
}
