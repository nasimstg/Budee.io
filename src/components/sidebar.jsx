"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Sidebar({data}) {
  const [path, setPath] = useState(usePathname())
  
  return (
    <ul className="flex flex-col bg-zinc-100 dark:bg-zinc-900 mr-4 rounded gap-2 p-2">
      {
        data?.map( (e, index)=>{
          return (
            <li className="gap-4rounded" key={index}>
              <Button asChild variant="outline" className={path === e.link ? ' text-lg w-[100%] h-auto justify-start bg-accent p-4' : ' text-lg w-[100%] h-auto justify-start p-4' }>
                <Link href={e.link} className="w-[100%] h-auto p-4">
                  <div className="flex flex-row gap-2 items-center">
                      {e.icon}
                      {e.title}
                  </div>
                </Link>
              </Button>
            </li>
          )
        })
      }
    </ul>
  )
}
