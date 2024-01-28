'use client'
import React, { useEffect, useId } from 'react'
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
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { addContact } from '@/lib/db/contacts'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { getContacts } from '@/lib/db/contacts'
import { useUser } from '@clerk/nextjs'

 
export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
})

import { columns } from './columns'

export function AddContacts(){
  const {user} = useUser()

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
      }
    })
  
    function onSubmit(data) {
      addContact(user.emailAddresses[0].emailAddress, data)
        .then((record) => {
          form.reset();
          console.log(record);
          if(record != -1){
            toast({
              title: "Success!",
              description: "Contact added successfully. Name: " + data.name + " Email: " + data.email + ".",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }
          else{
            toast({
              title: "Error!",
              description: "Contact could not be added. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast({
            title: "Error!",
            description: "Contact could not be added. Please try again." + error,
            status: "error",
            duration: 5000,
            isClosable: true,
            variant: "destructive",
          });
        });
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <>
            <FormItem  className="mb-4">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Md Nasim Sheikh" {...field} />
              </FormControl>
              <FormDescription>
                Name should be recongnizable.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
            <FormItem  className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="user@domain.tld" {...field} />
              </FormControl>
              <FormDescription>
                Email will be used to send notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </>
          )}
        />
        <Button type="submit">Add</Button>
        </form>
    </Form>
  )
}

const menu_data = [
  {
    title: "Add New Contact",
    process: "Adding New Contact",
    des:"",
    comp: <AddContacts />,
  },
]

export default function Contacts() {
  const [myContacts, setMyContacts] = useState(null);

  const [loading, setLoading] = useState(false);
  const {user} = useUser()
  useEffect( () => {
    setLoading(true);
    async function fetchData(email) {
      const res = await getContacts(email);
      setMyContacts(res);
      console.log(res);
    }
    if(user){
      fetchData(user.emailAddresses[0].emailAddress);
    }
    setLoading(false);
  }, [user]);
  return (<>
        {loading ? <h1>Loading...</h1> :
        <section className='mx-10 my-4'>
        <div className='flex my-4'>
          <div className='flex-1 '>
            <Sidebar data={data}/>
          </div>
          <div className=' flex-[3]'>
            <TopMenu  data={menu_data}/>
            { 
              myContacts?.length === 0 ? <h1 className='text-2xl text-center'>No Contacts Found</h1> : <DataTable columns={columns} data ={myContacts != null ? myContacts : []}/>
            }
          </div>
        </div>
      </section>
    }
    </>
  )
}
