import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function EventsPage() {
    const {userId}=auth();
    if(!userId){
        return redirect('/')
    }
    const event=await db.event.findMany({
        where:{
            userId,
            isPublished:true
        },
        orderBy:{
            createdAt:'desc'
        },
        
    })
    return (
        <div>
            {
                event.length>0 ? (
                    <DataTable columns={columns} data={event}/>
                ):(
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-8">No events found</h1>
                    </div>
                )
            }
        </div>
    );
}