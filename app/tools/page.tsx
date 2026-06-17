import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToolVaultClient from './ToolVaultClient'

export const metadata = {
  title: 'Tool Vault | Creator Pier — MysterMyself',
  description: 'The AI tools, resource guides, and district structure used to build Scott-King Coast.',
}

export default function ToolsPage() {
  return (
    <main style={{ background: 'var(--black)' }}>
      <Navbar />
      <ToolVaultClient />
      <Footer />
    </main>
  )
}
