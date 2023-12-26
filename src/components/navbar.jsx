import React from 'react'
import { UserButton } from '@clerk/nextjs'
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

import { useTheme } from 'next-themes'


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
export function Documentation(){
  return(
    <HoverCard>
      <HoverCardTrigger>Documentation</HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  )
}
export default function Navbar() {
  const {theme} = useTheme()
  return (
    <section className='flex flex-row justify-between items-center mx-10 my-4'>
        <div>
          <ul className='flex flex-row gap-10'>
            <li className=" cursor-pointer  hover:bg-slate-900 hover:text-blue-400 transition-colors duration-1000 px-4 py-2 rounded">
              <Link href={'/'}>Budee.io</Link>
            </li>
            <li className=" cursor-pointer  hover:bg-slate-900 hover:text-blue-400 transition-colors duration-1000 px-4 py-2 rounded ">
              <Link href={'/about'}>About</Link>
              </li>
            <li className=" cursor-pointer"><Pricing /></li>
          </ul>
        </div>
        <div className='flex flex-row justify-between items-center gap-2'>
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
            theme === 'dark' ? <UserButton appearance={{baseTheme: dark}} signInUrl='/sign-in' afterSignOutUrl='/sign-in' /> : <UserButton signInUrl='/sign-in' afterSignOutUrl='/sign-in' />
          }
      </div>

    </section>
  )
}
