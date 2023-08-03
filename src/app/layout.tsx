import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Unsplash App',
  description: 'It is an application to search photos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <header className="h-16 bg-transparent backdrop-blur-md flex fixed w-full px-6">
          <div className="h-auto my-auto font-bold text-5xl tracking-tighter">
            Search Image
          </div>
        </header>
        <main className="pt-20 pb-8 bg-gray-950 min-h-screen">
          <Suspense fallback={'loading...'}>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
