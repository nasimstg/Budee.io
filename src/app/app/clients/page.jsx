'use client'
import {data} from "@/data/sidebarData"
import Sidebar from '@/components/sidebar'
import TopMenu from '@/components/topmenu'
import { DataTable } from '@/components/table'
import { useEffect, useState } from "react"
import { getClients } from "@/lib/db/clients"
import { useUser } from "@clerk/nextjs"
import { columns } from "./columns"


const menu_data = [
    {
      title: "Add New Contact",
      process: "Adding New Contact",
      des:"",
      comp: "AddContact",
      btnTxt: 'Add'
    },
  ]

export default function Page() {
  const [clients, setClients] = useState([])
  const {user} = useUser()
  useEffect(() => {
    const fetchData = async () => {
      const res = await getClients(user.emailAddresses[0].emailAddress)
      setClients(res)
    }
    if(user){
      fetchData()
    }
  }, [user])
  return (
    <section className='mx-10 my-4'>
            <div className='flex my-4'>
            <div className='flex-1 '>
                <Sidebar data={data}/>
            </div>
            <div className=' flex-[3]'>
                <DataTable columns={columns}  data={clients && clients}/>
            </div>
            </div>
    </section>
  )
}
