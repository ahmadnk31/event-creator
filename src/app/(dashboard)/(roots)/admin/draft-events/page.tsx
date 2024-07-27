import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function DraftEventsPage() {
    const {userId}=auth();
    if(!userId){
        return redirect('/')
    }
    const events =await db.event.findMany({
        where:{
            userId,
            isPublished:false
        },
        orderBy:{
            createdAt:'desc'
        }
    })
    return (
        <div className="p-4">
            <DataTable columns={columns} data={events}/>
        </div>
    );
}