'use client';

import { useEffect } from 'react';

export default function EmailSender({ data, onSuccess, onError }) {
  useEffect(() => {
    const sendEmail = async () => {
      try {
        console.log('Starting email send process with data:', data);
        
        // Validate required fields with detailed error messages
        const requiredFields = {
          toEmail: 'Recipient email',
          fromName: 'Your name',
          fromEmail: 'Your email',
          message: 'Message content'
        };

        const missingFields = Object.entries(requiredFields)
          .filter(([key]) => !data[key]?.trim())
          .map(([_, label]) => label);

        if (missingFields.length > 0) {
          throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        const templateParams = {
          to_email: data.toEmail.trim(),
          to_name: data.toName?.trim() || 'Team Lead',
          from_name: data.fromName.trim(),
          from_email: data.fromEmail.trim(),
          subject: data.subject?.trim() || 'New Collaboration Request',
          message: data.message.trim(),
          type: data.type?.trim() || 'project',
          project_title: data.projectTitle?.trim() || '',
          skills: data.skills?.trim() || '',
          availability: data.availability?.trim() || '',
          action_link: data.actionLink?.trim() || '',
        };

        console.log('Sending email with params:', templateParams);

        // Use the global emailjs instance
        const result = await window.emailjs.send(
          'service_yx8cfak',
          'template_project_collab',
          templateParams
        );

        console.log('Email sent successfully:', result);
        onSuccess?.(result);
      } catch (error) {
        console.error('Detailed email error:', {
          message: error.message,
          text: error.text,
          status: error.status,
          stack: error.stack,
          data: data
        });
        onError?.(error);
      }
    };

    if (data) {
      sendEmail();
    }
  }, [data, onSuccess, onError]);

  return null; // This is a utility component, it doesn't render anything
} 