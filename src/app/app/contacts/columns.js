'use client'
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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


export const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
        id: "actions",
        cell: ({ row }) => {     
            console.log(row);
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                <Dialog>
                    <DialogTrigger asChild>
                        <p>
                            Edit
                        </p>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Edit Contacts</DialogTitle>
                        <DialogDescription>
                            Make changes to your Contacts here. Click save when youre done.
                        </DialogDescription>
                        </DialogHeader>
                        
                        <DialogFooter>
                        <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                </DropdownMenuItem>

                <DropdownMenuItem>
                <Dialog>
                    <DialogTrigger asChild>
                        <p>
                            Delete
                        </p>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Edit Contacts</DialogTitle>
                        <DialogDescription>
                            Make changes to your Contacts here. Click save when youre done.
                        </DialogDescription>
                        </DialogHeader>
                        
                        <DialogFooter>
                        <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                    </Dialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]

export function dioalogBox({data}){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p>
                    {data.name}
                </p>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>{data.title}</DialogTitle>
                <DialogDescription>
                    {data.description}
                </DialogDescription>
                </DialogHeader>
                    {data.comp}
                <DialogFooter>
                <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
    )
}