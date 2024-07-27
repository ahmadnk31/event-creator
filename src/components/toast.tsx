import { useToast } from "./ui/use-toast";
import { ReactNode } from "react";

interface ToastProps {
    title: string;
    description?: string;
    type?:'default'|'destructive'
}

export const Toast=({title,description,type}:ToastProps)=>{
    const {toast} = useToast();
    return (
        <>
            {toast({
                title,
                description,
                variant: type==='default'?'default':'destructive',
            })}
        </>
    )
}