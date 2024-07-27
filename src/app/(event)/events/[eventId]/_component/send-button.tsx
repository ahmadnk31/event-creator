
'use client'
import { Toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface SendButtonProps {
    id:string;
    title: string;
    description: string;
    date:Date,
    expiresAt:Date,
    location:string,
    price:number,
    qrCode:string,
}

export function SendButton({id,title,description,date,expiresAt,location,price,qrCode}:SendButtonProps) {
    const sendEmail=async()=>{
        try{
            await axios.post(`/api/events/${id}/send`,{
                eventInfo:{
                    title,
                    description,
                    date,
                    expiresAt,
                    location,
                    price,
                    qrCode
                }
            });
            <Toast title="Email sent" description="Check your inbox for the ticket"/>
        }catch{
            <Toast
            title="Something went wrong"
            description='Please try again later'
            type='destructive'
            />
        }
    }
    return (
        <Button
        size='sm'
        className="text-left"
            onClick={sendEmail}
            variant='ghost'
        >
            Recieve via Email
        </Button>
    )
}