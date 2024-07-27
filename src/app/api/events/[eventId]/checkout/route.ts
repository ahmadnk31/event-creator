import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req:Request,{params}:{params:{eventId:string}}){
    try{
        const user=await currentUser();
        if(!user||!user.emailAddresses?.[0]?.emailAddress||!user.id){
            return new NextResponse("Unauthorized",{status:401})
        }
        const event=await db.event.findUnique({
            where:{
                id:params.eventId,
                isPublished:true
            }
        })
        const purchase=await db.purchase.findUnique({
            where:{
                userId_eventId:{
                    userId:user.id,
                    eventId:params.eventId
                }
            }
        })
        if(purchase){
            return new NextResponse("Already Purchased",{status:400})
        }
        if(!event){
            return new NextResponse("Not Found",{status:404})
        }
        const line_items:Stripe.Checkout.SessionCreateParams.LineItem[]=[
            {
                quantity:1,
                price_data:{
                    currency:'EUR',
                    product_data:{
                        name:event.title,
                        description:event.description!,
                    },
                    unit_amount:Math.round(event.price!*100)
                }
            }
        ]
        let stripeCustomer=await db.stripeCustomer.findUnique({
            where:{
                userId:user.id
            },
            select:{
                stripeCustomerId:true
            }
        })
        if(!stripeCustomer){
            const customer=await stripe.customers.create({
                email:user.emailAddresses[0].emailAddress
            })
            stripeCustomer=await db.stripeCustomer.create({
                data:{
                    userId:user.id,
                    stripeCustomerId:customer.id
                }
            })
        }
        const session=await stripe.checkout.sessions.create({
            customer:stripeCustomer.stripeCustomerId,
            mode:'payment',
            line_items,
            success_url:`${process.env.NEXT_PUBLIC_BASE_URL}/events/${params.eventId}/success`,
            cancel_url:`${process.env.NEXT_PUBLIC_BASE_URL}/events/${params.eventId}/cancel`,
            metadata:{
                userId:user.id,
                eventId:params.eventId
            }
        })
        return NextResponse.json({url:session.url})
    }catch(error){
        console.log(`COURSE_CHECKOUT_ERROR`,error)  
        return new NextResponse("Internal Server Error",{status:500})
    }
}