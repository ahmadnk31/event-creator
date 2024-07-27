import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try{
        const {userId}=auth();
        const {title}=await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        // Create an event
        const event=await db.event.create({
            data:{
                userId,
                title
            }
        })
        return NextResponse.json(event)
    }catch(error){
        console.log("[EVENTS]",error)
        return new NextResponse("Internal Error",{status:500})
    }
}