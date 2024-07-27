"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Event } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {EventAction} from "../[eventId]/_components/event-actions"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import db from "@/lib/db"
import { ConfirmModal } from "@/components/confirm-modal"
 

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Event>[] = [
    {
    accessorKey: "title",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
        const price=parseFloat(row.getValue('price')||'0')
        const formatedPrice=Intl.NumberFormat('en-EU',{style:'currency',currency:'EUR'}).format(price)
        return(
            <div>
                {formatedPrice}
            </div>
        )
    }
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
        const date=new Date(row.getValue('date'))
        return(
            <div>
                {date.toLocaleDateString()}
            </div>
        )
    }
  },
  {
    id:'actions',
    cell:({row})=>{
        
        const eventId=row.original.id
        return(
            <DropdownMenu>
  <DropdownMenuTrigger>
  <Button variant='ghost' size='sm' className="text-neutral-500">
  <MoreHorizontal className="h-4 w-4" /> 
  </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Event</DropdownMenuLabel>
    <DropdownMenuSeparator />
    
    <Link className="hover:cursor-auto" href={`/admin/events/${eventId}`}>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
</DropdownMenu>
        )
    
    }
  }
]
