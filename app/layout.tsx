import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-script',
  weight: ['400', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'For Sani ❤️',
  description: 'A special Valentine&apos;s Day surprise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ height: '100%', overflow: 'hidden', scrollBehavior: 'smooth' }}>
      <body className={`${playfair.variable} ${poppins.variable} font-sans antialiased`} style={{ height: '100%', overflow: 'hidden', touchAction: 'pan-y' }}>
        {children}
      </body>
    </html>
  )
}

