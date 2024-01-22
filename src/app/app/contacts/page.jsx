'use client'
import React from 'react'
import {data} from "@/data/sidebarData"
import Sidebar from '@/components/sidebar'
import TopMenu from '@/components/topmenu'
import { DataTable } from '@/components/table'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
 
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
})



export function AddContacts(){
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
      }
    })
  
    function onSubmit(data) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
    }

  return (
    <Form>
      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
    </Form>
  )
}

const menu_data = [
  {
    title: "Add New Contact",
    process: "Adding New Contact",
    des:"",
    comp: <AddContacts />,
    btnTxt: 'Add'
  },
]

export default function contacts() {
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
