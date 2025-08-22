import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'


export const metadata: Metadata = {
  title: 'More Tiers — College Essay Coaching',
  description: 'We coach, we challenge, we climb. US‑wide college essay coaching for parents and students.',
  openGraph: {
    title: 'More Tiers — College Essay Coaching',
    description: 'We coach, we challenge, we climb.',
    url: 'https://moretiers.example',
    siteName: 'More Tiers',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  )
}
