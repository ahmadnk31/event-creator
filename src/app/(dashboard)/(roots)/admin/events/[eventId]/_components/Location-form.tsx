'use client'

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import { Event } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
const libs:Libraries=['places']
interface LocationFormProps {
    initialData:Event,
    eventId:string
}
export function LocationForm({initialData,eventId}:LocationFormProps) {
    const [map,setMape]=useState<google.maps.Map|null>()
    const [autoComplete,setAutoComplete]=useState<google.maps.places.Autocomplete|null>()
    const {isLoaded}=useJsApiLoader({
        googleMapsApiKey:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries:libs
    })
    const [edit,setEdit]=useState(false)
    const [location,setLocation]=useState('')
    const toggleEditing=()=>setEdit((current)=>!current)
    const mapRef=React.useRef<HTMLDivElement>(null)
    const autoCompleteRef=React.useRef<HTMLInputElement>(null)
    useEffect(()=>{
        if(isLoaded){
            // const map=new google.maps.Map(mapRef.current as HTMLDivElement,{
            //     center:{lat:0,lng:0},
            //     zoom:3
            // })
            // setMape(map)
            const autoComplete=new google.maps.places.Autocomplete(autoCompleteRef.current as HTMLInputElement)
            autoComplete.setFields(['address_components','formatted_address'])
            autoComplete.addListener('place_changed',()=>{
                const place=autoComplete.getPlace()
                if(place){
                    setLocation(place.formatted_address as string)
                }
            })
            setAutoComplete(autoComplete)
        }
    },[isLoaded,edit])
    const router=useRouter()
    const {toast}=useToast()
    console.log(location)
    const onSubmit=async(e: { preventDefault: () => void; })=>{
        e.preventDefault()
        try{
            await axios.patch(`/api/events/${eventId}`,{location})
            toggleEditing()
            toast({
                title:'Location updated',
                description:new Date().toLocaleTimeString()
            })
            router.refresh()
        }catch{
            toast({
                title:'Error',
                description:'An error occured'
            })
        }
    }
    // console.log(autoComplete?.getPlace())
    // console.log(autoComplete?.getBounds())


    
    
    return (
        
            
                <div className="p-4 border rounded shadow-sm">
            <div className="flex items-center justify-between">
                <h1 className="text-lg mb-2">Event Location</h1>
                <Button
                variant='ghost'
                onClick={toggleEditing}
                >
                    {
                        edit?'Cancel':'Edit'
                    }
                </Button>
            </div>
            
                
                    
                            {
                                edit&&(
                                    isLoaded&&(
                                        <div >
                        <form 
                        onSubmit={onSubmit}
                        >
                            <div className="flex flex-col gap-4">
                            <input
                            autoComplete='on'
                            disabled={!edit}
                            ref={autoCompleteRef}
                            className={cn('w-full border rounded disabled:bg-white disabled:border-none disabled:p-0 disabled:text-neutral-500 p-2')}
                            placeholder="Enter location"
                        />
                        
                            
                                <Button
                                type='submit'
                                className="w-fit"
                                >
                                    Save
                                </Button>
                            
                        
                            </div>
                        
                        </form>
                    </div>
                                    )
                                )
                            }
                        
                {
                    !edit&&(
                        <div>
                            <p className="text-base text-neutral-500">
                                {
                                    initialData.location?initialData.location:'No location'
                                }
                            </p>
                        </div>
                    )
                    
                }
            
            
        </div>
            )
        
}


