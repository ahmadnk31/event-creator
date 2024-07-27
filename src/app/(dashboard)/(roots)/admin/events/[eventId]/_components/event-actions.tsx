'use client'

import { ConfirmModal } from "@/components/confirm-modal"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface EventActionProps{
    isDisabled:boolean
    eventId:string
    isPublished:boolean
}
export const EventAction=({isDisabled,eventId,isPublished}:EventActionProps)=>{
    const {toast}=useToast()
    const router=useRouter()
    const onConfirm=async()=>{
        try{
            if(isPublished){
                await axios.patch(`/api/events/${eventId}/unpublish`,{
                    isPublished:false
                })
                toast({
                    title:'Event unpublished',
                    description:new Date().toLocaleString()
                })
            }else{
                await axios.patch(`/api/events/${eventId}/publish`,{
                    isPublished:true
                })
                toast({
                    title:'Event published',
                    description:new Date().toLocaleString()
                })
            }
            router.refresh()
        }catch{
            toast({
                variant:'destructive',
                title:'Something went wrong',
                description:new Date().toLocaleString()
            })
        }
    }
    const onDelete=async()=>{
        try{
            await axios.delete(`/api/events/${eventId}`)
            toast({
                title:'Event deleted',
                description:new Date().toLocaleString()
            })
            router.push('/admin/events')
            router.refresh()
        }catch{
            toast({
                title:'Something went wrong',
                description:new Date().toLocaleString()
            })
        }
    }
    return(
        <div className="flex gap-x-2">
            <ConfirmModal
            onConfirm={onConfirm}
            >
                <Button
                className="text-white bg-orange-500 hover:bg-orange-600"
                disabled={isDisabled}
                >
                    {isPublished?'Unpublish':'Publish'}
                </Button>
            </ConfirmModal>
            <ConfirmModal onConfirm={onDelete}>
                <Button
                variant='ghost'
                className='text-orange-500 hover:bg-orange-500/20 hover:text-orange-500'
                 disabled={isDisabled}>Delete</Button>
            </ConfirmModal>
        </div>
    )
}