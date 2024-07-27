import { EventList } from "@/components/event-list";
import { SearchInput } from "@/components/search-input";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Browse({searchParams}:{searchParams:{title:string}}){
    const {userId}=auth()
    console.log(searchParams)
    if(!userId){
        return redirect("/")
    }
    
    
    const events=await db.event.findMany({
        where:{
            userId,
            isPublished:true,
            title:{
                contains:searchParams.title
            },
    }
    })
    return(
        <div className="p-6">
            <SearchInput/>
            <div>
                <EventList events={events}/>
            </div>
        </div>
    )
}