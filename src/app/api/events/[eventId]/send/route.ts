import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:Request) {
  try {
    const {eventInfo}=await req.json();
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['nikzadahmadullah@gmail.com'],
      subject: 'Hello world',
      react: EmailTemplate({...eventInfo}),
    });

    if (error) {
        console.log(error);
      return new NextResponse('Something went wrong', { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
