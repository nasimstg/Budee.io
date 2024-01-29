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
import { columns } from "./columns"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { getAccounts } from "@/lib/db/datasource"

const accountType = [
  {
    name:'Google Ads',
    img:'/images/adwords.png',
    action:'/app/new/google',
  },
  {
    name: 'Meta Ads',	
    img:'/images/meta.png',
    action:'/app/new/meta'
  },
  {
    name: 'Bing Ads',
    img:'/images/bing.png',
    action:'/app/new/bing',
  },
  {
    name: 'Twitter Ads',
    img:'/images/twitter.png',
    action:'/app/new/twitter',
  },
  {
    name: 'Linkedin Ads',
    img:'/images/linkedin.png',
    action:'/app/new/linkedin',
  },
  {
    name: 'Tiktok Ads',
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
  const [loading, setLoading] = useState(true)
  const [accounts, setAccounts] = useState([])
  const {user} = useUser()

  useEffect(() => {
    async function fetchData() {
      const res = await getAccounts(user.emailAddresses[0].emailAddress)
      setAccounts(res)
    }
    if(user){
      fetchData()
    }
    setLoading(false)
  }, [user])
  return (
    <section className='mx-10 my-4'>
    <div className='flex my-4'>
      <div className='flex-1 '>
        <Sidebar data={data}/>
      </div>
      <div className=' flex-[3]'>
        <TopMenu  data={menu_data}/>
        {
          loading ? <div>Loading...</div> : <DataTable  columns={columns} data={accounts != null && accounts}/>
        }
      </div>
    </div>
  </section>
  )
}

// 