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

const accountType = [
  {
    img:'/images/adwords.png',
    action:'/new/google'
  },
  {
    img:'/images/meta.png',
    action:'/new/meta'
  }
]


export function Accounts (){
  return (
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            {
              accountType.map((item, index) =>(
                <Button key={index} variant="outline" className='flex justify-center items-center w-40 h-40' asChild
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