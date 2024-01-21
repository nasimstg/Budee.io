'use client'
import Body from '@/components/body'
import Sidebar from '@/components/sidebar'
import TopMenu from '@/components/topmenu'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {data} from "@/data/sidebarData"

const CreateClient = () =>{
  return (
    <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Client Name" className="col-span-3" />
          </div>
        </div>
  )
}

const CreateBudget = () =>{
  return (
   <div>
      Budget Page
   </div>
  )
}

const AddCampaigns = () =>{
  return(
    <div>
      Campaigns Page
    </div>
  )
}

export const menu_data = [
  {
    title: "Create Client",
    process: "You are creating a new Client",
    des:"Clients can contain one, or many, Budgets. Budgets are groups of campaigns that can represent an entire Client or represent a specific location, region, product, or source",
    comp: <CreateClient />,
    btnTxt: 'Create'
   
},
{
    title: "Add Campaigns",
    process: "You are adding a new Campaign",
    des:"Campaigns belong to a budget. Campaigns can be added from any account, and from any source.",
    comp: <AddCampaigns />,
    btnTxt: "Add"
},
{
  title: "Create Budget",
  process: "You are creating a new Budget",
  des:"Budgets are groups of campaigns that can represent an entire Client or represent a specific location, region, product, or source",
  comp: <CreateBudget />,
  btnTxt: "Create"
}
]


export default function Home() {


  return (
    <section className='mx-10 my-4'>
      <div className='flex my-4'>
        <div className='flex-1 '>
          <Sidebar data={data} />
        </div>
        <div className=' flex-[3]'>
          <TopMenu data={menu_data} />
          <Body />
        </div>
      </div>
    </section>
  )
}
