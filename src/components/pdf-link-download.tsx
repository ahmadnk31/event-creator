'use client'

import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDF } from "./pdf";

interface PDFProps {
    qrCodeUrl: string;
    title: string;
    description?: string;
    date?: Date;
    location?: string;
    price?: number;
    expiresAt?: Date;
}

export function PdfLinkDownload({ qrCodeUrl, title, description, date, location, price, expiresAt }: PDFProps) {
    return (
        
        <PDFDownloadLink document={<PDF
            title={title}
            description={description}
            date={date}
            location={location}
            price={price}
            expiresAt={expiresAt}
         qrCodeUrl={qrCodeUrl}/>} fileName={`${title}.pdf`}>
            {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download as pdf'
            }
        </PDFDownloadLink>
    )
}