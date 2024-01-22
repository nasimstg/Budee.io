'use client'
import {data} from "@/data/sidebarData"
import Sidebar from '@/components/sidebar'
import TopMenu from '@/components/topmenu'
import { DataTable } from '@/components/table'


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
