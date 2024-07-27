"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
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
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'
import { useRouter } from "next/navigation"
import { Event } from "@prisma/client"
import { formatPrice } from "@/lib/format-price"

const formSchema = z.object({
  price:z.coerce.number()
})

interface PriceFormProps {
    initialData: Event,
    eventId: string
}

export function PriceForm({ initialData, eventId }: PriceFormProps) {
  const {toast}=useToast()
  // ...
  const router=useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEditing = () => setIsEditing((current) => !current)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price||0,
    },
  })  
  const {isSubmitting,isValid}=form.formState
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        await axios.patch(`/api/events/${eventId}`,values)
        toast({
            title:'Price updated',
            description:new Date().toLocaleTimeString(),
        })
        router.refresh()
        toggleEditing()
    }catch{
        toast({
            title:'An error occurred',
            description:new Date().toLocaleTimeString(),
            variant:'destructive'
        })
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className=" border p-4 rounded shadow-sm">
        <div className="flex items-center  justify-between">
            <h2 className="text-lg">Event price</h2>
            <Button 
                variant="ghost"
            onClick={toggleEditing}>
                {isEditing ? 'Cancel' : 'Edit'}
            </Button>
        </div>
        {!isEditing && (
            <div>
            <p className="text-base text-neutral-500">{
              initialData.price?(
                formatPrice(initialData.price)
              ):'No price'
              }</p>
            </div>
        )}
        {isEditing &&(
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                      disabled={isSubmitting}
                      type='number' step='0.1' placeholder="This event is the biggest event..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This price will be displayed on the event page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                  disabled={isSubmitting||!isValid}
              type="submit">Update</Button>
            </form>
          </Form>
        )}
    </div>
  )
}
