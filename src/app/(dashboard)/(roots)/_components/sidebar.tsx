import { Logo } from "./logo";
import { SidebarRoutes } from "@/components/sidebar-routes";

export function Sidebar(){
    return(
        <div className="flex flex-col h-full border-r bg-white overflow-y-auto">
            <div className="p-6">
                <Logo/>
            </div>
            <div className="pl-6">
                <SidebarRoutes/>
            </div>
        </div>
    )
}