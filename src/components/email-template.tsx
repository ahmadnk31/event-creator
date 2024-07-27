import * as React from 'react';
import { PDF } from './pdf';
import { PdfLinkDownload } from './pdf-link-download';
import { QrCode } from './qr-code';

interface EmailTemplateProps {
  title: string;
  description: string;
    date: Date;
}

export const EmailTemplate = ({
    title,
    description,
    date,
}:EmailTemplateProps) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <p>{new Date(date).toLocaleDateString()}</p>
  </div>
);
