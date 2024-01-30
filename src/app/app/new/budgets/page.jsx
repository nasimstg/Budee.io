'use client'
import React from 'react'
import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DataTable } from '@/components/table'
import { clientColumns } from './clientColumns'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { campaignColumns } from './campaignCollumns'
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
import { DatePicker } from '@/components/datepicker'

const budgetSchema = z.object({
    clientId: z.string(),
    campaings: z.array(),
    start: z.date(),
    end: z.date(),
    thisBudgetTotal: z.number(),
    alertings: z.array(),
    automations: z.array(),
    nameOfBudget: z.string(),
})

const steps = [
    {
      id: 'Step 1',
      name: 'Client Selection',
      fields: ['clientId']
    },
    {
      id: 'Step 2',
      name: 'Import Campaigns',
      fields: ['campaignsId', 'type', 'account']
    },
    { id: 'Step 3', 
      name: 'Budget Configurations',
      fields: ['start', 'end', 'thisBudgetTotal', 'alertings', 'automations', 'nameOfBudget']
    },
    {
      id: 'Step 4',
      name: 'Complete',
    },
  ]

export default function Page() {
    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedCampaigns, setSelectedCampaigns] = useState([]);

    const [clients, setClients] = useState([
        {
            id: '1xssa',
            name: 'Client 1',
            email: 'emil@gg.com',
        },
        {
            id: '2asdr',
            name: 'Client 2',
            email: 'c3@gg.com',
        },
    ])
    const [campaigns, setCampaigns] = useState([
      {
        id: 'cam1xssaa',
        name: 'Client 1',
        origin: 'Google Ads',
        account: 'Account 1',
        email: 'emil@gg.com',
        campaings: [
          {
            id: 'campain1xssa',
          }
        ]
      },
      {
          id: '2asdraa',
          name: 'Client 2',
          origin: 'Google Ads',
          account: 'Account 2',
          email: 'c3@gg.com',
      },
    ])

    const form = useForm({
        resolver: zodResolver(budgetSchema),
        defaultValues: {
            clientId: "",
            campaings: [],
            start: "",
            end: "",
            thisBudgetTotal: 0,
            alertings: [],
            automations: [],
            nameOfBudget: "",
        }
      })

      const processForm = data => {
        console.log(data)
        reset()
      }
    
    
      const next = async () => {
        const fields = steps[currentStep].fields
        const output = await form.trigger(fields, { shouldFocus: true })
    
        if (!output) return
    
        if (currentStep < steps.length - 1) {
          if (currentStep === steps.length - 2) {
            await form.handleSubmit(processForm)()
          }
          setPreviousStep(currentStep)
          setCurrentStep(step => step + 1)
        }
      }
    
      const prev = () => {
        if (currentStep > 0) {
          setPreviousStep(currentStep)
          setCurrentStep(step => step - 1)
        }
      }
      const columns = clientColumns(setSelectedRowId);
      const campaginCol = campaignColumns(selectedCampaigns, setSelectedCampaigns)
    return (
        <section className='flex flex-col items-center justify-between py-4 px-10 overflow-hidden'>
             {/* steps */}
            <nav aria-label='Progress'>
                <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
                {steps.map((step, index) => (
                    <li key={step.name} className='md:flex-1'>
                    {currentStep > index ? (
                        <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                        <span className='text-sm font-medium text-sky-600 transition-colors '>
                            {step.id}
                        </span>
                        <span className='text-sm font-medium'>{step.name}</span>
                        </div>
                    ) : currentStep === index ? (
                        <div
                        className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                        aria-current='step'
                        >
                        <span className='text-sm font-medium text-sky-600'>
                            {step.id}
                        </span>
                        <span className='text-sm font-medium'>{step.name}</span>
                        </div>
                    ) : (
                        <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                        <span className='text-sm font-medium text-gray-500 transition-colors'>
                            {step.id}
                        </span>
                        <span className='text-sm font-medium'>{step.name}</span>
                        </div>
                    )}
                    </li>
                ))}
                </ol>
            </nav>

            {/* Client Selection */}
            {
              currentStep === 0 && 
                <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }} className=' w-3/4 mt-4 py-10'>
                    {
                      clients.length === 0 ? 
                      <h1 className='text-2xl text-center'>No Clients Found</h1> : 
                        <DataTable columns={columns} 
                        data={clients !=null ? clients : []} 
                        selectedRowId={selectedRowId} 
                        setSelectedRowId={setSelectedRowId} 
                        />
                    }
                    {selectedRowId && (<h1 className='text-2xl text-center'>Selected Client: {selectedRowId}</h1>)}
                </motion.div>
            }

            {
              currentStep === 1 &&
              <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }} className=' w-3/4 mt-4 py-10'>
                  {
                    campaigns.length === 0 ? 
                    <h1 className='text-2xl text-center'>No Ads Campagin Data Found</h1> : 
                      <DataTable columns={campaginCol} 
                        data={campaigns !=null ? campaigns : []} 
                      />
                  }
              </motion.div>

            }

            {
              currentStep === 2 &&
              <motion.div
              initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }} className=' w-3/4 mt-4 py-10'>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(processForm)}>
                      <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <>
                            <FormItem  className="mb-4">
                              <FormLabel>Budget Name</FormLabel>
                              <FormControl>
                                <Input placeholder="budget for nasimstg - 1" {...field} />
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
                          name="amount"
                          render={({ field }) => (
                            <>
                            <FormItem  className="mb-4">
                              <FormLabel>Budget Amount</FormLabel>
                              <FormControl>
                                <Input placeholder="user@domain.tld" {...field} />
                              </FormControl>
                              <FormDescription>
                                Amount of budget for this period. 
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          </>
                          )}
                        />
                        <div className='flex justify-start gap-8'>
                        <FormField
                          control={form.control}
                          name="start"
                          render={({ field }) => (
                            <>
                            <FormItem  className="mb-4 flex flex-col">
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                <DatePicker {...field} />
                              </FormControl>
                              <FormDescription>
                                Start date of the budget.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          </>
                          )}
                          />
                          <FormField
                          control={form.control}
                          name="end"
                          render={({ field }) => (
                            <>
                            <FormItem  className="mb-4 flex flex-col">
                              <FormLabel>End Date</FormLabel>
                              <FormControl>
                                <DatePicker {...field} />
                              </FormControl>
                              <FormDescription>
                               End date of the budget.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          </>
                          )}
                          />
                          </div>
                        <Button type="submit">Save Changes</Button>
                        </form>
                    </Form>
              </motion.div>

            }
            {/* Import Campaigns */}
            {/* Budget Configurations */}
            {/* Review */}
            {/* Complete */}

            {/* Steps Navigation */}
            <div className='mt-8 pt-5'>
              <div className='flex justify-between'>
                <Button
                  onClick={prev}
                  disabled={currentStep === 0}
                  variant='outline'
                >
                  <ArrowLeftIcon  className='h-8 w-8'/>
                </Button>
                <Button
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  variant='outline'
                >
                  <ArrowRightIcon  className='h-8 w-8' />
                </Button>
              </div>
            </div>
        </section>
    )
}
