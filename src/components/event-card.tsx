

import Link from "next/link";
import { useQRCode } from "next-qrcode";
import { formatPrice } from "@/lib/format-price";
import { Calendar, MapPin, PartyPopper, Ticket, TicketX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { QrCode } from "./qr-code";
interface EventCardProps {
    id: string;
    title: string;
    description?: string;
    price: number;
    date: Date;
    expiresAt: Date;
    location: string;
    qrCode?: string;
}

export async function EventCard({ title, id, price, date, expiresAt, location, qrCode }: EventCardProps) {
    const { userId } = auth();
    if(!userId){
        return redirect('/')
    }
    const purchase=await db.purchase.findUnique({
        where:{
            userId_eventId:{
                eventId:id,
                userId
            }
        },
        
    })
    return (
        <Link href={`/events/${id}`}>
            <div className="group flex flex-col justify-between hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div>
                {
                    purchase && (
                        <div className="flex justify-center">
                            <QrCode
                            text={qrCode!}
                            />
                        </div>
                    )
                }
                {
                    purchase===null && (
                        <div className="flex p-8 justify-center">
                           <PartyPopper className="text-orange-500" size={100} />
                        </div>
                    )
                }
                </div>
                <div className="flex flex-col">
                    <div className="text-lg md:text-base text-balance font-medium group-hover:text-orange-500 transition line-clamp-2">
                        {title}
                    </div>
                    <div className="text-neutral-600 mt-1">
                        {formatPrice(price)}
                    </div>
                    <div className="mt-2">
                        <span className="flex items-center text-neutral-500 mt-2 text-sm">
                            <Calendar className="inline mr-2" size={16} />
                            <span>
                                {new Date(date).toLocaleDateString()} - {new Date(expiresAt).toLocaleDateString()}
                            </span>
                        </span>
                    </div>
                    <div className="text-neutral-500 mt-2 text-sm">
                       <MapPin className="inline mr-2" size={16} />
                        <span>
                            {location}
                        </span>
                    </div>
                    <div className="mt-4">
                        <Button
                        
                         className="w-fit md:w-full bg-orange-500 text-white hover:bg-orange-600">
                            View ticket
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}