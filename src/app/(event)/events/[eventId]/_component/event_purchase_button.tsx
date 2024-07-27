'use client'

import axios from "axios"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format-price"
import {Resend} from 'resend'

interface EventPurchaseButtonProps {
    price:number
    eventId:string,
}


export function EventPurchaseButton({price,eventId}:EventPurchaseButtonProps){
    const {toast}=useToast()
    const [isLoading,setIsLoading]=useState(false)
    const sendConfirmationEmail=async()=>{
        try{
            setIsLoading(true)
            const response=await axios.post(`/api/events/${eventId}/send`,{
                eventInfo:{
                    title:'Successfully purchased',
                    description:'You have successfully purchased the ticket',
                    date:new Date().toLocaleDateString(),
                }
            })
            toast({
                title:'Email sent',
                description:'Check your inbox for the ticket'
            })
        }catch{
            toast({
                title:'Something went wrong',
                description:new Date().toLocaleTimeString(),
                variant:'destructive'
            })
        }finally{
            setIsLoading(false)
        }
    }
    const purchase=async()=>{
        try{
            setIsLoading(true)
            const response=await axios.post(`/api/events/${eventId}/checkout`)
            window.location.assign(response.data.url)
        }catch{
            toast({
                title:'Something went wrong',
                description:new Date().toLocaleTimeString(),
                variant:'destructive'
            })
        }finally{
            setIsLoading(false)
        }
    }
    const handler=async()=>{
            setIsLoading(true);
            await purchase();
            await sendConfirmationEmail();
            setIsLoading(false);
    }
    return(
        <div>
            <Button
            onClick={purchase}
            disabled={isLoading}
            className="w-full md:w-auto bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
            >
                Purchase for {formatPrice(price)}
            </Button>
        </div>
    )
}