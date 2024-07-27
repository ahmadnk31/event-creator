"use client"

import { formatPrice } from "@/lib/format-price"
import { Event } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {  MoreHorizontal } from "lucide-react"
// This type is used to define the shape of our data.
import Link from "next/link"
import { DataTable } from "./data-table"
import { DataTableColumnHeader } from "./data-table-column-header"

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: ({column})=>(
        <DataTableColumnHeader column={column} title='Title'/>
    )
  },
  {
    accessorKey: "price",
    header: ({column})=>(
        <DataTableColumnHeader column={column} title='Price'/>
    ),
    cell: ({row}) => {
        const price=row.original.price
        const formattedPrice=formatPrice(price||0)
        return(
            <span>{formattedPrice}</span>
        )
    }
  },
  {
      accessorKey: "date",
      header: ({column})=>(
        <DataTableColumnHeader column={column} title='Date'/>
      ),
      cell: ({row}) => {
          const date=row.original.date
          return(
              <>{
                  date ? new Date(date).toLocaleDateString() : ""
                  }</>
          )
      },
      
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const eventId = row.original.id
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My event</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/admin/events/${eventId}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
]
