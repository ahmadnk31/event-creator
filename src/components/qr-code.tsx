'use client'
import {useQRCode} from "next-qrcode";
export function QrCode({text}: {text: string}) {
    const {Canvas}=useQRCode()
    return (
        <Canvas
            text={text}
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 120,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
            }}
        />
    );
    
}