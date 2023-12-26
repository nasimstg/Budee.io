import Sidebar from "@/components/sidebar"
import { data } from "../page"
import TopMenu from "@/components/topmenu"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'


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

export const menu_data = [
  {
    title: "Invite New Members",
    process: "Inviting a non Budee.io user",
    des:"",
    comp: <InviteUser />,
    btnTxt: 'Invite'
},

]

export default function Admin() {
  return (
    <section className='mx-10 my-4'>
    <div className='flex my-4'>
      <div className='flex-1 '>
        <Sidebar data={data} />
      </div>
      <div className=' flex-[3]'>
        <TopMenu  data={menu_data}/>
      </div>
    </div>
  </section>
  )
}
