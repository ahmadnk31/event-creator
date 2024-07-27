import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, LucideIcon } from "lucide-react";
import {cva,type VariantProps} from 'class-variance-authority'

const BannerVariants=cva(
    'w-full border flex items-center p-4 text-center text-sm',
    {
        variants:{
            variant:{
                warning:'bg-yellow-200/80 border-yellow-300 text-primary',
                success:'bg-emerald-800 border-emerald-200/20 text-secondary'
            }
        },
        defaultVariants:{
            variant:'warning'
        }
    }
)

interface BannerProps extends VariantProps<typeof BannerVariants>{
    label:string
}

const iconMap={
    warning:AlertTriangle,
    success:CheckCircle
}

export function Banner({label,variant}:BannerProps){
    const Icon=iconMap[variant||'warning']
    return(
        <div className={cn(BannerVariants({variant}))}>
            <Icon className='w-6 h-6 mr-2'/>
            {label}
        </div>
    )
}