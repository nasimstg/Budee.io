'use client'
import React, { useEffect } from 'react'
import { formSchema } from '../../page';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getContact, updateContact } from '@/lib/db/contacts';
import { useUser } from '@clerk/nextjs';
import { toast } from '@/components/ui/use-toast';
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
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';

export default function Page({params}) {
    const [loading, setLoading] = React.useState(true)
    const {user} = useUser()
    const router = useRouter()
    const [contact, setcontact] = React.useState(null)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: contact?.name,
            email: contact?.email,
        }
    });
        
    function onSubmit(data) {
    updateContact(user.emailAddresses[0].emailAddress, data, params.id)
        .then((record) => {
        form.reset();
        console.log(record);
        if(record != -1){
            toast({
            title: "Success!",
            description: "Contact Updated successfully. Name: " + data.name + " Email: " + data.email + ". Redirecting to contacts page...",
            status: "success",
            duration: 5000,
            isClosable: true,
            });
            router.push('/app/contacts')
        }
        else{
            toast({
            title: "Error!",
            description: "Contact could not be updated. Please try again.",
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

    useEffect(() => {
        async function fetchContact(email, id) {
            const contact = await getContact(email, id).then((contact) => contact[0]);
            setcontact(contact)
        }
        if(user) {
            fetchContact(user.emailAddresses[0].emailAddress, params.id)
            setLoading(false)
        }
    }, [user, params.id])

  return (
    <div className='flex items-center justify-center my-8'>
        {
            loading ? <p>Loading...</p> : 
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-semibold mb-4">Edit Contact</h1>
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <>
                <FormItem  className="mb-4">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input placeholder={contact?.name} {...field} />
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
                    <Input placeholder={contact?.email} {...field} />
                </FormControl>
                <FormDescription>
                    Email will be used to send notifications.
                </FormDescription>
                <FormMessage />
                </FormItem>
            </>
            )}
            />
            <Button type="submit">Update</Button>
            </form>
        </Form>}
    </div>
  )
}
