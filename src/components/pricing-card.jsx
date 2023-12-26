import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

export default function PCard({title, des, disabled}) {
  return (
    <Card className="w-[80%]">
      <CardHeader>
        <CardTitle>Free Tier</CardTitle>
        <CardDescription>Perfect for Getting Started</CardDescription>
      </CardHeader>
      <CardContent>
          <ul className=' list-disc px-8 pb-4'>
            <li>One Client</li>
            <li>Unlimited Users</li>
            <li>20 Budgets</li>
            <li>All Features</li>
            <li>Standard Support</li>
          </ul>
          <div>
          <p>
            UNLIMITED Monthly Ad Spend
          </p>
          </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p>You pay <span className='text-red-500 font-bold'>0.00 $</span> per  month</p>
        {
          disabled ? <Button className="w-full" variant="destructive">Get Started
        </Button> : <Button className="w-full">Get Started
        </Button>
        }
        
      </CardFooter>
    </Card>
  )
}
