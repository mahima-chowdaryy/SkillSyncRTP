import { NextResponse } from 'next/server';
import emailjs from '@emailjs/nodejs';

export async function POST(request) {
  try {
    console.log('Testing email functionality...');
    
    // Initialize EmailJS
    emailjs.init({
      publicKey: 'tRD14YfnN9gQ1mLp8',
      privateKey: process.env.EMAILJS_PRIVATE_KEY
    });

    // Test email parameters
    const templateParams = {
      to_email: '23r21a6759@mlrit.ac.in',
      to_name: 'Test Recipient',
      from_name: 'Test Sender',
      from_email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test email to verify EmailJS configuration.',
      type: 'project',
      project_title: 'Test Project',
      skills: 'Test Skills',
      availability: 'Test Availability',
      action_link: 'http://localhost:3001'
    };

    console.log('Sending test email with params:', templateParams);

    // Send test email
    const result = await emailjs.send(
      'service_yx8cfak',
      'template_project_collab',
      templateParams
    );

    console.log('Test email sent successfully:', result);
    return NextResponse.json({ message: 'Test email sent successfully', result });
  } catch (error) {
    console.error('Test email error:', {
      message: error.message,
      text: error.text,
      status: error.status,
      stack: error.stack
    });
    return NextResponse.json(
      { error: 'Failed to send test email', details: error.message },
      { status: 500 }
    );
  }
} 