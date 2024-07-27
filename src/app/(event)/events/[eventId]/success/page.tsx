import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function Success({params}:{params:{eventId:string}}){
    return(
        <div className="flex flex-col  items-center justify-center h-screen">
           <div className="text-emerald-500 py-4 flex flex-col gap-2 justify-center items-center">
           <CheckCircle className="size-16" />
           <h1>Purchase was successfull</h1>
           </div>
           <Link className="underline" href={`/events/${params.eventId}`}>
           Back to the purchased ticket
           </Link>
        </div>
    )
}