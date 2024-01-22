'use client'
import Sidebar from "@/components/sidebar"
import TopMenu from "@/components/topmenu"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {data} from "@/data/sidebarData"
import { useTheme } from "next-themes";
import {dark} from "@clerk/themes";


const InviteUser = () =>{
  return (
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value="name@domain.com" className="col-span-3" />
          </div>
        </div>
  )
}

import { CreateOrganization, OrganizationList, OrganizationProfile, useUser } from "@clerk/nextjs";

export function CreateTeam (){
  const {theme} = useTheme()
  return (
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
          {
            theme === 'dark' ? <CreateOrganization appearance={{baseTheme: dark}}/> : <CreateOrganization appearance={{baseTheme: ""}} />
          }
          </div>
    </div>
  )
}

export function JoinTeam (){
  const {theme} = useTheme()

  return (
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
          {
            theme === 'dark' ? <OrganizationList appearance={{baseTheme: dark}}/> : <OrganizationList appearance={{baseTheme: ""}} />
          }
          </div>
    </div>
  )
}

export const menu_data = [
  {
    title: "Invite New Members",
    process: "Inviting a non Budee.io user",
    des:"",
    comp: <InviteUser />,
    btnTxt: 'Invite'
  },
  {
    title: "Create a Team",
    process: "",
    des:"",
    comp: <CreateTeam />,
  },
  {
    title: "Join a Team",
    process: "",
    des:"",
    comp: <JoinTeam />,
  },

] 

export default function Admin() {
  const {theme} = useTheme()
  const { isSignedIn, user, isLoaded } = useUser();

  console.log(user)
  return (
    <section className='mx-10 my-4'>
    <div className='flex my-4'>
      <div className='flex-1 '>
        <Sidebar data={data} />
      </div>
      <div className=' flex-[3]'>
        <TopMenu  data={menu_data}/>

        
        { isLoaded && user?.organizationMemberships.length > 0 &&
          theme === 'dark' ? <OrganizationProfile appearance={{baseTheme: dark}}/> : <OrganizationProfile appearance={{baseTheme: ""}} />
        }
      </div>
      <div>
        
      </div>
    </div>
  </section>
  )
}
