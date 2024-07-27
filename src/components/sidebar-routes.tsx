'use client'

import { Compass, DraftingCompass, LayoutDashboard, Ticket } from "lucide-react";
import { usePathname,} from "next/navigation";
import { SidebarItem } from "../app/(dashboard)/(roots)/_components/sidebar-item";


const guestRoutes = [
    {
        Icon:LayoutDashboard,
        title:'Dashboard',
        href:'/'
    },{
        Icon:Compass,
        title:'Browse',
        href:'/search'
    }
]
const adminRoutes = [
{
    Icon:Ticket,
    title:'Events',
    href:'/admin/events'
},
{
    Icon:DraftingCompass,
    title:'Drafts',
    href:'/admin/draft-events'
}
]


export function SidebarRoutes() {
   const pathname=usePathname()
   const isAdminPage=pathname?.includes('/admin')
   const routes=isAdminPage?adminRoutes:guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {
                routes.map((route,index)=>(
                    <SidebarItem
                    key={index}
                    Icon={route.Icon}
                    title={route.title}
                    href={route.href}
                    />
                ))
            }
        </div>
    );
}