import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import CharacterInterrupt from '@/components/triggers/CharacterInterrupt'

export const metadata: Metadata = {
  title: {
    default: 'MysterMyself Ecosystem OS | Skills. Plays. Freedom.',
    template: '%s | MysterMyself',
  },
  description:
    'The MysterMyself Ecosystem OS — Trading Chef University, Courier Income Lab, Breaded Or Not?!, Money Move Playbooks, Fantasy Draft Bible, and AI Operator Lab. Learn skills, find income plays, build your next money move.',
  keywords: [
    'trading education',
    'XAUUSD',
    'gold trading',
    'courier income',
    'food business',
    'money moves',
    'Maurice Scott',
    'MysterMyself',
    'Trading Chef University',
    'income plays',
  ],
  authors: [{ name: 'Maurice Scott', url: 'https://mysterymyself.com' }],
  openGraph: {
    title: 'MysterMyself Ecosystem OS',
    description: 'Skills. Plays. Freedom.',
    type: 'website',
    siteName: 'MysterMyself',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@mysterycartel',
    title: 'MysterMyself Ecosystem OS',
    description: 'Skills. Plays. Freedom.',
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
