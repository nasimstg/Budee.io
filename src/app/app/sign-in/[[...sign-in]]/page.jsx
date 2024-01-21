'use client'
import { SignIn } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import { useTheme } from "next-themes";


export default function Page() {
  const {theme} = useTheme()
  console.log(theme)
  return (
    <section className="flex items-center justify-center">
      {
        theme === 'dark' ? <SignIn appearance={{baseTheme: dark}}/> : <SignIn appearance={{baseTheme: ""}} />
      }
    </section>
  )
}