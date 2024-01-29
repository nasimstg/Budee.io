'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { addDataSource } from '@/lib/db/datasource'
import { toast } from '@/components/ui/use-toast'
import { Toast } from '@/components/ui/toast'

export default function Google({params}) {

  const router = useRouter()
  const {user} = useUser()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function add() {
      const code = searchParams.get('code')
      const response = await fetch('/api/google/exchange', {
        method: 'POST',
        body: JSON.stringify({code: code}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      const data = await response.json()
  
      if (!data) {
        throw new Error('No data returned from /api/google/exchange');
      }
  
      const {accessToken, refreshToken, email} = data;

      const res = await addDataSource(user.emailAddresses[0].emailAddress, {name: 'Google', email: email, code: searchParams.get('code'), accessToken: accessToken, refreshToken: refreshToken})
      console.log(res)  
      if(res != -1){
          toast({
            title: "Success!",
            description: "Google Ads account added successfully." + res.toString(),
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
        else{
          toast({
            title: "Error!",
            description: "Google Ads Account could not be added. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
            variant: "destructive",
          });
        }
      router.push('/app/data-source')
    }
    if(user){
      add()
    }
    
  }, [user, searchParams, router])

  return (
    <div className='flex flex-col justify-center items-center m-8 text-3xl'>
      <p>You account has been added!</p>
    <br />
    <Toast />
    <Link className=' border-green-400 border-b pb-2 text-green-400 flex items-center' href={`/app/data-source`}> 
      go to app 
      <ArrowUpRight className='h-8 w-10' />
    </Link>
    </div>
  )
}
