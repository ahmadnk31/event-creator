'use client'

import { UserButton } from "@clerk/nextjs";
import { usePathname,useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function NavbarRoutes() {
    const router=useRouter();
    const pathname=usePathname();
    const isAdminPage=pathname.startsWith('/admin');
    const onClick=()=>{
        if(isAdminPage){
            router.push('/');
        }else{
            router.push('/admin/create');
        }
    }
    return (
        <div className="ml-auto">
            <div className="flex items-center gap-x-8">
                <Button className="text-neutral-700 hover:bg-orange-500/20 hover:text-orange-700"
                size='sm'
                variant='ghost'
                onClick={onClick}
                type="button"
                >
                    {
                        isAdminPage?'Exit':'Go to Admin'
                    }
                </Button>
                <UserButton/>
            </div>
            
        </div>
    );
}