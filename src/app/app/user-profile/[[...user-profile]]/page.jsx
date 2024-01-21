"use client"
import { UserProfile } from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
    const {theme} = useTheme()
    console.log(theme) 
    return (
    <div className="flex items-center justify-center">

      {theme === 'dark' ? <UserProfile appearance={{baseTheme: dark}}/> : <UserProfile appearance={{baseTheme: ""}} /> }
      
    </div>
      )

}