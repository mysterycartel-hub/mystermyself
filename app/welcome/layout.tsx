import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Welcome to Scott-King Coast',
  openGraph: {
    title: 'Welcome to Scott-King Coast — MysterMyself',
    description: "You're in. Choose your district and start receiving income opportunities, tools, and lessons from your lane.",
    url: 'https://mystermyself.com/welcome',
  },
}

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
