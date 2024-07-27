'use client'
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

const formSchema = z.object({
  title: z.string().min(5, {
    message: "title must be at least 5 characters.",
  }),
})

export function CreateEventPage() {
    const {toast}=useToast()
    const router=useRouter()
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: "",
    },
  })
  const {isSubmitting,isValid} = form.formState
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
try{
    const response=await axios.post('/api/events',values)
    router.push(`/admin/events/${response.data.id}`)
    toast({
        title:'Event created',
        description:new Date().toLocaleTimeString(),
    })
}catch{
    toast({
        title:'An error occurred',
        description:new Date().toLocaleTimeString(),
        variant:'destructive'
    })
}
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 md:p-8  max-w-3xl mx-auto">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Tailor swift's concert" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your event. Make it catchy!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-4">
            <Link href="/">
            <Button 
            variant="ghost"
            type="button"
            className='transition hover:bg-orange-500/10 text-orange-500 hover:text-orange-500'
            >
                Cancel
            </Button>
            </Link>
        <Button
        className='bg-orange-500 text-white hover:bg-orange-600'
        disabled={isSubmitting||!isValid}
         type="submit">Continue</Button>
        </div>
      </form>
    </Form>
  )
}
