'use client'
import { ArrowUpDown, MoreHorizontal, Edit3Icon, DeleteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { useUser } from "@clerk/nextjs"


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"

  
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"


export const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            console.log(row.original);
          return (
            <>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <Link href={`/app/contacts/edit/${row.original.id}`}>
                    <span className="sr-only">Edit Contact</span>
                    <Edit3Icon className="h-4 w-4" />
                    </Link>
                </Button>
                <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Delete Contact</span>
                    <DeleteIcon className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                    <DialogTitle>Are you sure you ?</DialogTitle>
                    <DialogDescription>
                    Deleting this contact will remove it from your list of contacts. This action cannot be undone.
                        <Separator className="my-2" />
                        <p className="">Name: {row.original.name} <br />
                        Email: {row.original.email} </p>
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                    <Button variant="destructive" type="submit">Delete</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
            </>
          )
        },
      },
]