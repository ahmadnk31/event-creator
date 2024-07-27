
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format-price";
import {Button} from '@/components/ui/button'
import db from '@/lib/db'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { useQRCode } from 'next-qrcode';
import { ChevronDown } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { QrCode } from "@/components/qr-code";
import { EventPurchaseButton } from "./event_purchase_button";
import Link from "next/link";
import { PDF } from "@/components/pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfLinkDownload } from "@/components/pdf-link-download";
import { Toast } from "@/components/toast";
import axios from "axios";
import { SendButton } from "./send-button";
interface EventContainerProps {
    id:string;
    title: string;
    description: string;
    date:Date,
    expiresAt:Date,
    location:string,
    price:number,
    qrCode:string,
}

export async function EventContainer({id,title,description,date,expiresAt,location,price,qrCode}:EventContainerProps){
    const {userId}=auth();
    if(!userId){
        return redirect('/')
    }
    const purchase=await db.purchase.findUnique({
        where:{
        userId_eventId:{
            userId,
            eventId:id
        }
        }
    })
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
        <div 
        className="border max-w-4xl p-6 mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <Separator/>
                <CardContent>
                    <div className="py-4">
                        <p>{description}</p>
                    </div>
                    <Separator/>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-3 mb-2">
                        <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold">Begin</span>
                            <span>{new Date(date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold">End</span>
                            <span>{new Date(expiresAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold">Price</span>
                            <span>{formatPrice(price)}</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-lg font-semibold">Location</span>
                            <span>{location}</span>
                        </div>
                    </div>
                    {purchase && (
                         <>
                         <QrCode
                         text={qrCode!}/>
                         <p className="text-xs text-neutral-500">Scan the Qr code before entering!</p>
                         </>
                    )}
                    

                </CardContent>
                <CardFooter className="flex justify-end gap-x-4">
                <Link className="mr-2 text-orange-500 hover:text-orange-500 hover:bg-orange-500/20 py-2 px-3 rounded" href={`/search`}>
                {
                    purchase?('Purchase more'):('Cancel')
                }
                </Link>
                    {!purchase && (
                        <EventPurchaseButton
                        eventId={id}
                        price={price!}
                        />
                    )}
                    
                    {purchase && (
                        <DropdownMenu>
                        <DropdownMenuTrigger className="b">
                            <Button className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white">
                                Receive ticket via
                            <ChevronDown className="size-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <SendButton
                            title={title}
                            price={price}
                            date={date}
                            expiresAt={expiresAt}
                            location={location}
                            qrCode={qrCode}
                            description={description}
                            id={id}
                            />
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PdfLinkDownload
                            title={title}
                            price={price}
                            date={date}
                            expiresAt={expiresAt}
                            location={location}
                            qrCodeUrl={qrCode}
                            description={description}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                    )}
                    
                </CardFooter>
            </Card>
        </div>
    );
}
