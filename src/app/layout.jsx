'use client'
import { Inter } from 'next/font/google'
import './global.css'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const {theme} = useTheme()
  console.log(theme)
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Navbar />
          {children}
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
