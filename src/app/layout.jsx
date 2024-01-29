'use client'
import { Inter } from 'next/font/google'
import './global.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { ToastProvider } from '@/components/ui/toast'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    if (theme) {
      console.log(theme)
    }
  }, [theme])
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-gray-100 dark:bg-gray-900">
              <nav className="bg-white dark:bg-gray-800 shadow">
              </nav>
            </div>
            <ToastProvider>
          {children}
          </ToastProvider>
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
