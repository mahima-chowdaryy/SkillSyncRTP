import { NextResponse } from 'next/server';
import emailjs from '@emailjs/browser';

export async function POST(req) {
  try {
    const { toEmail, toName, fromName, fromEmail, message } = await req.json();

    // Initialize EmailJS with your public key
    emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

    const templateParams = {
      to_email: toEmail,
      to_name: toName,
      from_name: fromName,
      from_email: fromEmail,
      message: message,
    };

    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    );
  }
} 