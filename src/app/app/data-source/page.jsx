'use client'
import Sidebar from "@/components/sidebar"
import TopMenu from "@/components/topmenu"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DataTable } from "@/components/table"
import {data} from "@/data/sidebarData"
import { useRouter } from 'next/router'

const accountType = [
  {
    img:'/images/adwords.png',
    action:'/app/new/google',
  },
  {
    img:'/images/meta.png',
    action:'/app/new/meta'
  },
  {
    img:'/images/bing.png',
    action:'/app/new/bing',
  },
  {
    img:'/images/twitter.png',
    action:'/app/new/twitter',
  },
  {
    img:'/images/linkedin.png',
    action:'/app/new/linkedin',
  },
  {
    img:'/images/tik-tok.png',
    action:'/app/new/tiktok',
  },
]


export function Accounts (){
  return (
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            {
              accountType.map((item, index) =>(
                <Button  key={index} variant="outline" className='flex justify-center items-center w-28 h-28' asChild
                >
                  <Link href={item.action}>
                  <Image src={item.img} width={64} height={64} alt={item}></Image></Link>
                </Button>
              ))
            }
          </div>
    </div>
  )
}

export const menu_data = [
  {
    title: "Add New Data Source",
    process: "Connect add Accounts",
    des:"Connecting a new account to your Budee.io account, such as a new Google Ads, Bing Ads, Facebook Ads, Tiktok Ads etc.",
    comp: <Accounts />,
  },
] 

export default function DataSource() {
  return (
    <section className='mx-10 my-4'>
    <div className='flex my-4'>
      <div className='flex-1 '>
        <Sidebar data={data}/>
      </div>
      <div className=' flex-[3]'>
        <TopMenu  data={menu_data}/>
        <DataTable />
      </div>
    </div>
  </section>
  )
}

// 