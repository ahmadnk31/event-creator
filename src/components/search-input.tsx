'use client'

import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import qs from 'query-string'
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchInput() {
    const [search, setSearch] = useState<string>('')
    const debounce = useDebounce(search)
    const router=useRouter()
    const searchParams=useSearchParams()
    const pathname=usePathname()
    useEffect(()=>{
        const url=qs.stringifyUrl({
            url:pathname,
            query:{
                title:debounce
            },
        },{
            skipEmptyString:true,
            skipNull:true
        })
        router.push(url)
    },[debounce,router,searchParams,pathname])
    return (
        <div className="relative">
            <Search className="absolute size-6 top-2 left-2  text-neutral-500"/>
                <Input
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search for an event"
                className="w-full pl-10 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                />
            </div>
    );
}