import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export function Navbar() {
    return (
        <nav className="flex items-center h-full px-6 bg-white shadow-sm">
           <MobileSidebar/>
           <NavbarRoutes/>
        </nav>
    );
}