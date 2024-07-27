
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { PriceForm } from "./_components/price-form";
import { DateForm } from "./_components/date-form";
import { ExpiresDateForm } from "./_components/expires-date-form copy";
import { LocationForm } from "./_components/Location-form";
import { QrCodeForm } from "./_components/qr-code-form";
import { Banner } from "@/components/banner";
import { Button } from "@/components/ui/button";
import { EventAction } from "./_components/event-actions";


export default async function EventPage({params}:{params:{eventId:string}}) {
    const {userId}=auth()
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
    const requiredFields = [
        event.title,
        event.description,
        event.price,
        event.date,
        event.expiresAt,
        event.location,
    ]
    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const completionText = `${completedFields}/${totalFields} fields completed`
    const isCompleted=requiredFields.every(Boolean)
    return (
        <>
        {
                !event.isPublished && (
                    <Banner
                    label="Your event is not published"
                    variant='warning'
                    />

                )
            }
        <div className="p-6">
            
            <div>                
                <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-8">Event setup</h1>
                <EventAction
                isDisabled={!isCompleted}
                isPublished={event.isPublished!}
                eventId={params.eventId}
                />
                </div>
                <p className="text-neutral-500 mb-4">{completionText}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                <TitleForm
                initialData={event}
                eventId={params.eventId}
                />
                <DescriptionForm
                initialData={event}
                eventId={params.eventId}
                />
                <PriceForm
                initialData={event}
                eventId={params.eventId}
                />
                <QrCodeForm
                initialData={event}
                eventId={params.eventId}
                />
                </div>
                <div className="flex flex-col gap-6">
                <DateForm
                initialData={event}
                eventId={params.eventId}
                />
                <ExpiresDateForm
                initialData={event}
                eventId={params.eventId}
                />  
                <LocationForm
                initialData={event}
                eventId={params.eventId}
                />
                </div>
            </div>
        </div>
        </>
    );
}
