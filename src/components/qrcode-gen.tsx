'use client'
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
interface QRCodeGeneratorProps {
    text:string
    setQrCodeUrl:(url:string)=>void
}
export const QRCodeGenerator = ({ text, setQrCodeUrl }:QRCodeGeneratorProps) => {
  useEffect(() => {
    QRCode.toDataURL(text)
      .then(url => {
        setQrCodeUrl(url);
      })
      .catch(err => {
        console.error(err);
      });
  }, [text, setQrCodeUrl]);

  return null;
};

