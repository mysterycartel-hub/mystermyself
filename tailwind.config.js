/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black:    '#060608',
        deep:     '#0d0d10',
        gold:     '#c9a84c',
        'gold-light': '#f0c96e',
        'gold-dim':   '#7a6230',
        red:      '#c0392b',
        'red-bright': '#e74c3c',
        cream:    '#f5f0e8',
      },
      fontFamily: {
        bebas:   ['"Bebas Neue"', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
        serif:   ['"Playfair Display"', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'grid-shift':  'gridShift 20s linear infinite',
        'glow-pulse':  'glowPulse 4s ease-in-out infinite',
        'marquee':     'marquee 22s linear infinite',
        'marquee-rev': 'marqueeRev 25s linear infinite',
        'fade-up':     'fadeUp 0.8s ease forwards',
        'float':       'float 6s ease-in-out infinite',
      },
      keyframes: {
        gridShift: {
          '0%':   { transform: 'translate(0,0)' },
          '100%': { transform: 'translate(80px,80px)' },
        },
        glowPulse: {
          '0%,100%': { transform: 'translate(-50%,-50%) scale(1)', opacity: '0.8' },
          '50%':     { transform: 'translate(-50%,-50%) scale(1.15)', opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
