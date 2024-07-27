import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EventContainer } from "./_component/event-container";



export default async function EventPage({params}:{params:{eventId:string}}){
    const {userId}=auth();
    if(!userId){
        return redirect('/')
    }
    const event=await db.event.findUnique({
        where:{
            id:params.eventId,
            userId
        }
    })
    if(!event){
        return redirect('/')
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <EventContainer
            id={event.id}
            title={event.title}
            description={event.description!}
            price={event.price!}
            date={event.date!}
            expiresAt={event.expiresAt!}
            location={event.location!}
            qrCode={event.qrCode!}
            />
        </div>
    );
}