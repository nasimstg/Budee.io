'use client'
import { SignUp } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import { useTheme } from "next-themes";


export default function Page() {
  const {theme} = useTheme()
  return (
    <section className="flex items-center justify-center">
      {
        theme === 'dark' ? <SignUp appearance={{baseTheme: dark}}/> : <SignUp />
      }
    </section>
  )
}