import QRCode from 'qrcode'

// With promises
export const generateQRCode = async (text: string) => {
    try {
        const qrCode = await QRCode.toDataURL(text)
        return qrCode
    } catch (err) {
        console.error(err)
    }
}