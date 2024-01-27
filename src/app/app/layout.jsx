'use client'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const router = useRouter()
  const [pathname, setPathname] = useState(router.pathname)


  return (
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
  )
}
