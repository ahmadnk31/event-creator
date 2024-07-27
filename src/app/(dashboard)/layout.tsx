
import { Navbar } from "./(roots)/_components/navbar";
import { Sidebar } from "./(roots)/_components/sidebar";
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({ children }:{
    children: React.ReactNode
}) {
    return (
        <div className="h-full">
            <div className="fixed md:pl-72 inset-y-0 h-[80px] w-full z-[1000] bg-white">
            <Navbar/>
            </div>
            <div className="h-full fixed  w-72 hidden md:flex flex-col inset-y-0">
               <Sidebar/>
            </div>
            <main className="md:pl-72 pt-[80px]">
            {children}
            <Toaster/>
            </main>
        </div>
    );
}