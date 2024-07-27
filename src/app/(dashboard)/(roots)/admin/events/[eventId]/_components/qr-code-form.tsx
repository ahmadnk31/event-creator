"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useQRCode } from 'next-qrcode';
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
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
const formSchema = z.object({
  qrCode: z.string()
})

interface QrCodeFormProps {
    initialData: Event,
    eventId: string
}

export function QrCodeForm({ initialData, eventId }: QrCodeFormProps) {
  const {toast}=useToast()
  const {Canvas}=useQRCode()
  // ...
  const router=useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const toggleEditing = () => setIsEditing((current) => !current)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qrCode: initialData?.qrCode||'',
    },
  })  
  const {isSubmitting,isValid}=form.formState
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        await axios.patch(`/api/events/${eventId}`,values)
        toast({
            title:'Qr Code updated',
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
            <h2 className="text-lg">Event Qr Code</h2>
            <Button 
                variant="ghost"
            onClick={toggleEditing}>
                {isEditing ? 'Cancel' : 'Edit'}
            </Button>
        </div>
        {
          !isEditing&&(
            <div>
              {initialData.qrCode?(
                <div className="flex items-center justify-center">
                  <Canvas
                text={initialData.qrCode}
                options={{
                  errorCorrectionLevel: 'M',
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                  },
                }}
              />
                </div>
              ):(
                <p>No qrcode</p>
              )}
            </div>
          )
        }
        {isEditing &&(
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="qrCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='url' placeholder="https://example.com" {...field} />
                    </FormControl>
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
