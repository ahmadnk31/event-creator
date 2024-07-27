import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{
    params:{
        eventId:string
    }
}){
    try{
        const {userId}=auth()
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const event=await db.event.findUnique({
            where:{
                userId,
                id:params.eventId
            }
        })
        if(!event){
            return new NextResponse("Not Found",{status:404})
        }
        if(!event.title||!event.description||!event.price||!event.date||!event.expiresAt||!event.location){
            return new NextResponse("Missing required fields",{status:400})
        }
        const publishedEvent=await db.event.update({
            where:{
                userId,
                id:params.eventId
            },
            data:{
                isPublished:true
            }
        })
        return NextResponse.json(publishedEvent,{status:201})
    }catch(error){
        console.log("[EVENTS-PUBLISH]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}