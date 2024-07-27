"use client"
import { nlBE } from "date-fns/locale";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { DayPicker,getDefaultClassNames } from "react-day-picker"
import "react-day-picker/style.css";

const formSchema = z.object({
  expiresAt:z.date({message:'Please select a date'})
})

interface ExpiresDateFormProps {
    initialData: Event,
    eventId: string
}

export function ExpiresDateForm({ initialData, eventId }: ExpiresDateFormProps) {
  const {toast}=useToast()
  const defaultClassNames = getDefaultClassNames();
  // ...
  const router=useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEditing = () => setIsEditing((current) => !current)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expiresAt: initialData?.expiresAt||new Date(),
    },
  })  
  const {isSubmitting,isValid}=form.formState
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        await axios.patch(`/api/events/${eventId}`,values)
        toast({
            title:'Expires date updated',
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
        <div className="flex items-center justify-between">
            <h2 className="text-lg">Event expires date</h2>
            <Button 
                variant="ghost"
            onClick={toggleEditing}>
                {isEditing ? 'Cancel' : 'Edit'}
            </Button>
        </div>
        {!isEditing && (
            <div>
            <p className="text-base text-neutral-500">
              {initialData.expiresAt?(
                format(initialData.expiresAt, "PPP")
              ):(
                'No date selected'
              )}
            </p>
            </div>
        )}
        {isEditing &&(
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                  <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <DayPicker
                className="px-4 py-2"
      mode="single"
      selected={field.value}
      onSelect={field.onChange}
     disabledDays={{ before: new Date() }}
      classNames={{
        today: `border-orange-500 rounded-full`, // Add a border to today's date
        chevron:'fill-orange-500',
        selected: `bg-orange-500 text-white rounded-full`,
         // Add a background color to the selected date
      }}
    />
                </PopoverContent>
              </Popover>
                   
                    <FormDescription>
                      This date will be displayed on the event page.
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
