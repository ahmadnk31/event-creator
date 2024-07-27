'use client'

import React, { useEffect, useState } from 'react';
import {Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { generateQRCode } from '@/lib/gen-qr';
import { formatPrice } from '@/lib/format-price';
// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    gap: 10,
    marginHorizontal:'auto',
    maxWidth: '60%',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
  title:{
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  description:{
    fontSize: 14,
    marginBottom: 20,
  },
  grid:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    fontSize: 12,
    border:'1px solid black',
    padding:10
  }
});
interface PDFProps {
    qrCodeUrl: string;
    title: string;
    description?: string;
    date?: Date;
    location?: string;
    price?: number;
    expiresAt?: Date;
    
}
// Create a PDF document component
export const PDF = ({ qrCodeUrl,title,description,location,date,expiresAt,price }:PDFProps) => {
    const [qrCodeDataUri, setQrCodeDataUri] = useState<string | undefined>('');
    useEffect(() => {
        generateQRCode(qrCodeUrl).then((dataUri) => {
            return setQrCodeDataUri(dataUri);
        });
    }, [qrCodeUrl]);
return(
    <Document
    style={{padding:10}}
    >
    <Page
    orientation='portrait'
     size='A4' style={styles.page}>
      <View 
      style={{border:'1px solid black',padding:10}}
      >
        <Text style={{marginBottom:10,fontSize:18,fontWeight:700}}>
            {title}
        </Text>
        <Text style={{fontSize:14,color:'#333'}}>
            {description}
        </Text>
      </View>
      <View
       style={styles.grid}>
        <View>
            <Text style={{marginBottom:5,fontWeight:'black'}}>Date</Text>
            <Text>{
                date&&new Date(date).toLocaleDateString()
                }</Text>
        </View>   
        <View>
            <Text style={{marginBottom:5,fontWeight:'black'}}>Expire date</Text>
            <Text>{
                expiresAt&&new Date(expiresAt).toLocaleDateString()
                }</Text>
        </View>  
        <View>
            <Text style={{marginBottom:5,fontWeight:600}}>Price</Text>
            <Text>{price&&formatPrice(price)}</Text>
        </View>
        <View>
            <Text style={{marginBottom:5,fontWeight:600,textOverflow:'ellipsis'}}>Location</Text>
            <Text>{location}</Text>
        </View>
      </View>
      <View style={{width:100,height:100,marginTop:10}}>
        {qrCodeUrl && <Image style={styles.image} src={qrCodeDataUri} />}
      </View>
      <View style={{borderTop:1,marginTop:10,paddingTop:2,color:'#333'}}>
        <Text style={{fontSize:8}}>Scan the QrCode before entering!</Text>
      </View>
    </Page>
  </Document>
)
}

