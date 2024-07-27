import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function PATCH(req:Request,{params}:{
    params:{
        eventId:string
    }
}){
    try{
        const {userId}=auth();
        const values=await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const event=await db.event.update({
            where:{
                id:params.eventId,
                userId
            },
            data:{
                ...values
            }
        })
        if(!event){
            return new NextResponse("Not Found",{status:404})
        }
        return NextResponse.json(event)
    }catch(error){
        console.log("[EVENTS]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}

export async function DELETE(req:Request,{params}:{
    params:{
        eventId:string
    }
}){
    try{
        const {userId}=auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        const deletedEvent=await db.event.delete({
            where:{
                id:params.eventId,
                userId
            }
        })
        if(!deletedEvent){
            return new NextResponse("Not Found",{status:404})
        }
        return NextResponse.json(deletedEvent)
    }catch(error){
        console.log("[EVENTS-DELETE]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}