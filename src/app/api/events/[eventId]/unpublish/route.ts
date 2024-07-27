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
        const unpublishedEvent=await db.event.update({
            where:{
                userId,
                id:params.eventId
            },
            data:{
                isPublished:false
            }
        })
        return NextResponse.json(unpublishedEvent)
        
    }catch(error){
        console.log("[EVENTS]-UNPUBLISH",error)
        return new NextResponse("Internal Error",{status:500})
    }
}