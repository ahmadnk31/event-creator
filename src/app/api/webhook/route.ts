import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST=async(req:Request)=>{
    const body=await req.text();
    const signature=headers().get('Stripe-Signature') as string;
    let event:Stripe.Event;
    try{
        event=stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }catch(error:any){
        return new NextResponse(`Webhook error ${error.message}`,{status:400})
    }
    const session=event.data.object as Stripe.Checkout.Session
    const userId=session?.metadata?.userId
    const eventId=session?.metadata?.eventId
    if(event.type==='checkout.session.completed'){
        if(!userId||!eventId){
            return new NextResponse(`Webhook Error: Missing metadata`,{status:400})
        }
        await db.purchase.create({
            data:{
                eventId,
                userId
            }
        })
        }else{
            return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`,{status:200})
        }

}