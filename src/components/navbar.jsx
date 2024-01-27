import React, { useEffect } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import { ModeToggle } from './moodToggle'
import Link from 'next/link'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import PCard from './pricing-card'
import { Card } from './ui/card'
import { ChevronRightIcon , ChevronDownIcon, BellIcon, QuestionMarkIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { dark } from '@clerk/themes'

import { ArrowLeftIcon, ArrowRightToLineIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { initUser } from '@/lib/db/user'


export function Pricing(){
  const pricingData = [
    {

    }
  ]
  return(
    <HoverCard>
      <HoverCardTrigger className='flex gap-2 items-center hover:bg-slate-900 hover:text-blue-400 transition-colors duration-1000 px-4 py-2 rounded group'>
          Pricing 
        <ChevronDownIcon className='group-hover:rotate-180 transition duration-1000'/>
        </HoverCardTrigger>
      <HoverCardContent className="group">
        <div className='flex flex-row gap-10'>
          <ul className=' flex-[1]  mr-8'>
            <li className=' hover:bg-slate-800 p-4  my-4 w-[100%] bg-slate-800'>
              <div> 
                <p className=' text-lg flex items-center'>Free Tier <ChevronRightIcon className="ml-2 h-6 w-6"/></p>
              </div>
            </li>
            <li className='hover:bg-slate-900 p-4  my-4 w-[100%]'>
              <div> 
                <p className=' text-lg flex items-center'>Silver Tier <ChevronRightIcon className="ml-2 h-6 w-6"/></p>
              </div>
            </li>
            <li className='hover:bg-slate-900 p-4  my-4 w-[100%]'>
              <div> 
                <p className=' text-lg flex items-center'>Gold Tier <ChevronRightIcon className="ml-2 h-6 w-6"/></p>
              </div>
            </li>
            <li className='hover:bg-slate-900 p-4  my-4 w-[100%]'>
              <div> 
                <p className=' text-lg flex items-center'>Platinum Tier <ChevronRightIcon className="ml-2 h-6 w-6"/></p>
              </div>
            </li>
            <li className='hover:bg-slate-900 p-4  my-4 w-[100%]'>
              <div> 
                <p className=' text-lg flex items-center'>Enterprise Tier <ChevronRightIcon className="ml-2 h-6 w-6"/></p>
              </div>
            </li>

          </ul>
          <div className='flex-[2] h-[100%] w-[100%] flex items-center justify-center'>
            <PCard data={pricingData}/>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default function Navbar() {
  const {theme} = useTheme()
  const router = useRouter()
  const p = usePathname()
  let path = p.split('/')
  const {user} = useUser()

  useEffect(() => {
    if(user){
      initUser(user);
    }
  }, [user])
  return (
    <section className='flex flex-row justify-between items-center mx-10 my-4'>
        <div>
          <div className='flex flex-row gap-4 items-center'>
            <div className=''>
                <Button variant="outline" onClick={() => router.back()} className='flex items-center'>
                  <ArrowLeftIcon />
                </Button>
            </div>
            {
              path.map((item, index) => (
              <>
                {
                  item === '' ? <div key={index}>budee.io</div> : <div key={index} className='flex items-center gap-2'>
                  <ArrowRightToLineIcon />
                  <div key={index} className=''>
                    <Button variant="outline" className='flex items-center'>
                      {item === 'app' ? <Link href={'/app'}>{item}</Link>:<Link href={'/app/'+item}>{item}</Link>}
                    </Button>
                  </div>
                  </div>
                  }
              </>
              ))
            }
          </div>
        </div>
        <div id='notification' className='flex flex-row justify-between items-center gap-2'>
          <Popover>
            <PopoverTrigger><div className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground' ><BellIcon className="h-5 w-5"/></div></PopoverTrigger>
            <PopoverContent  className="w-[40vw] flex flex-col gap-4">
              <Alert>
                <QuestionMarkIcon className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  You can add components and dependencies to your app using the cli.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Hold up!</AlertTitle>
                <AlertDescription>
                  Somethings off, Something isn&apos;t right. Keep Hanging on a moment so that it is fixed for good.
                </AlertDescription>
              </Alert>
            </PopoverContent>
          </Popover>
          <ModeToggle />   
          {
            theme === 'dark' ? <UserButton appearance={{baseTheme: dark}} 
            signInUrl='/sign-in' 
            afterSignOutUrl='/sign-in'
            userProfileMode= 'navigation'
            userProfileUrl='/app/user-profile'
             /> 
            : <UserButton signInUrl='/sign-in' afterSignOutUrl='/sign-in' />
          }
      </div>

    </section>
  )
}

