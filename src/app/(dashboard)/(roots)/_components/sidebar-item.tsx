'use client'
import { cn } from '@/lib/utils'
import {LucideIcon} from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarItemProps {
    Icon: LucideIcon
    title:string
    href:string
}

export const SidebarItem=({Icon,title,href}:SidebarItemProps)=>{
    const pathname=usePathname()
    const router=useRouter()
    const onClick=()=>router.push(href)
    const isActive=(pathname==='/'&&href==='/')||pathname===href||pathname.startsWith(`${href}/`)
    return(
        <button
        className={cn('py-3 text-neutral-500',isActive&&'border-r-2 text-orange-500 border-orange-500')}
        type='button'
        onClick={onClick}
        >
            <div className='flex items-center gap-x-2'>
                <Icon className='size-6 mr-2'/>
                <span>{title}</span>
            </div>
        </button>
    )
}