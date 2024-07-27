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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 5 characters.",
  }),
})

interface TitleFormProps {
    initialData: {
        title: string
    },
    eventId: string
}

export function TitleForm({ initialData, eventId }: TitleFormProps) {
  const {toast}=useToast()
  // ...
  const router=useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEditing = () => setIsEditing((current) => !current)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })  
  const {isSubmitting,isValid}=form.formState
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        await axios.patch(`/api/events/${eventId}`,values)
        toast({
            title:'Event updated',
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
    <div className="border p-4 rounded shadow-sm">
        <div className="flex items-center justify-between">
            <h2 className="text-lg">Event title</h2>
            <Button 
                variant="ghost"
            onClick={toggleEditing}>
                {isEditing ? 'Cancel' : 'Edit'}
            </Button>
        </div>
        {!isEditing && (
            <div>
            <p className="text-base text-neutral-500">{initialData.title}</p>
            </div>
        )}
        {isEditing &&(
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This title will be displayed on the event page.
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
