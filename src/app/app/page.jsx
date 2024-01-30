'use client'
import Body from '@/components/body'
import Sidebar from '@/components/sidebar'
import TopMenu from '@/components/topmenu'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {data} from "@/data/sidebarData"
import { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from '@/components/ui/use-toast'
import { useUser } from '@clerk/nextjs'
import { addClient } from '@/lib/db/clients'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const clietSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  campaignsCount: z.number(),
  totalBudgets : z.number(),
  campaings: z.array(),
  budgets: z.array(),
  spent : z.number(),
  trend : z.number(),
  start : z.date(),
  end : z.date(),
  alert : z.string(),
  notifier : z.string().email(),
  percentage: z.number(),
  hasBudget: z.boolean(),
})


const CreateClient = () =>{
  const {user} = useUser()

  const clientFrom = useForm({
    resolver: zodResolver(clietSchema),
    defaultValues: {
      name: "",
      email: "",
      campaignsCount: 0,
      totalBudgets : 0,
      campaings: [],
      budgets: [],
      spent : 0,
      trend : 0,
      start : "",
      end : "",
      alert : "",
      notifier : "",
      percentage: 0,
      hasBudget: false,
    }
  })

  function onSubmit(data) {
    console.log(data)
    addClient(user.emailAddresses[0].emailAddress, data)
      .then((record) => {
        clientFrom.reset();
        console.log(record);
        if(record != -1){
          toast({
            title: "Success!",
            description: "Client added successfully. Name: " + data.name + " Email: " + data.email + ".",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        else{
          toast({
            title: "Error!",
            description: "Client could not be added. Please try again.",
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
          description: "Client could not be added. Please try again." + error,
          status: "error",
          duration: 5000,
          isClosable: true,
          variant: "destructive",
        });
      });
  }

  return (
    <Form {...clientFrom}>
      <form onSubmit={clientFrom.handleSubmit(onSubmit)}>
      <FormField
          control={clientFrom.control}
          name="name"
          render={({ field }) => (
            <>
            <FormItem  className="mb-4">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="nasimstg-1" {...field} />
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
          control={clientFrom.control}
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
        <Button type="submit">Add Client</Button>
        </form>
    </Form>
  )
}

const CreateBudget = () =>{
  return (
   <div>
      <Link href={'/app/new/budgets'} className='py-1 underline hover:text-green-400 transition-colors flex gap-2 items-center' >Go to budget creation page .. <ArrowRight className='h-4 w-4'/></Link>
   </div>
  )
}

export const menu_data = [
  {
    title: "Create Client",
    process: "You are creating a new Client",
    des:"Clients can contain one, or many, Budgets. Budgets are groups of campaigns that can represent an entire Client or represent a specific location, region, product, or source",
    comp: <CreateClient />,
   
},
{
  title: "Create Budget",
  process: "You are creating a new Budget",
  des:"Budgets are groups of campaigns that can represent an entire Client or represent a specific location, region, product, or source",
  comp: <CreateBudget />,
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
          <Body data={{...menu_data[0], title: 'here'}} />
        </div>
      </div>
    </section>
  )
}

