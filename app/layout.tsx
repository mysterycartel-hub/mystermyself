import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import CharacterInterrupt from '@/components/triggers/CharacterInterrupt'

export const metadata: Metadata = {
  metadataBase: new URL('https://mystermyself.com'),
  title: {
    default: 'MysterMyself | Scott-King Coast — One City. One System. Your Legacy.',
    template: '%s | MysterMyself',
  },
  description:
    'Scott-King Coast — the complete ecosystem for building skills, income plays, and ownership systems. Join The Opportunity List for courier drops, trading lessons, AI tools, fantasy intel, creator resources, and wealth-building systems.',
  keywords: [
    'Scott-King Coast',
    'MysterMyself',
    'The Opportunity List',
    'trading education',
    'courier income',
    'medical courier',
    'XAUUSD',
    'gold trading',
    'food business',
    'AI tools',
    'fantasy football',
    'Maurice Scott',
    'income plays',
  ],
  authors: [{ name: 'Maurice Scott', url: 'https://mystermyself.com' }],
  openGraph: {
    title: 'MysterMyself | Scott-King Coast',
    description: 'One City. One System. Your Legacy.',
    type: 'website',
    siteName: 'MysterMyself',
    url: 'https://mystermyself.com',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@mystermyself',
    title: 'MysterMyself | Scott-King Coast',
    description: 'One City. One System. Your Legacy.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <CharacterInterrupt />
        {children}
      </body>
    </html>
  )
}
