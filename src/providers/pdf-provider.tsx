import { createContext, useState } from "react";
interface PdfContextType {
    qrcodeUrl?: string;
    setQrCodeUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  }
export const PdfContext=createContext<PdfContextType|null>(null);
export const PdfProvider=({children}:{children:React.ReactNode})=>{
    const [qrcodeUrl,setQrCodeUrl]=useState<string>();
    return <PdfContext.Provider value={{qrcodeUrl,setQrCodeUrl}}>{children}</PdfContext.Provider>
}