import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { isAuthenticated } from '@/lib/auth'
import { NavBar } from '@/components/NavBar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Barreau Énergies',
  description: 'Application interne de gestion du pricebook — Barreau Énergies',
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const authed = await isAuthenticated()

  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {authed && <NavBar />}
        <div className="flex-1">{children}</div>
      </body>
    </html>
  )
}
