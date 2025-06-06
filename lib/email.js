import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

// Initialize EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(PUBLIC_KEY);
}

export async function sendEmail(templateParams) {
  try {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      throw new Error('Missing required EmailJS configuration');
    }

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

export const sendCollaborationEmail = async (data) => {
  try {
    const templateParams = {
      to_email: data.toEmail,
      to_name: data.toName,
      from_name: data.fromName,
      from_email: data.fromEmail,
      subject: data.subject || 'New Collaboration Request',
      message: data.message,
      type: data.type || 'project',
      project_title: data.projectTitle || '',
      skills: data.skills || '',
      availability: data.availability || '',
      action_link: data.actionLink || '',
    };

    return await sendEmail(templateParams);
  } catch (error) {
    console.error('Failed to send collaboration email:', error);
    throw error;
  }
};

export const sendRequestStatusEmail = async (user, project, status) => {
  try {
    const templateParams = {
      to_email: user.email,
      to_name: user.name,
      project_title: project.title,
      status: status,
      project_link: `http://localhost:3001/projects/${project._id}`,
    };

    await emailjs.send(
      'service_yx8cfak',
      'template_status_update',
      templateParams,
      {
        publicKey: 'tRD14YfnN9gQ1mLp8',
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );
  } catch (error) {
    console.error('Error sending status email:', error);
    throw error;
  }
};

export const sendContactEmail = async (name, email, message) => {
  try {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    await emailjs.send(
      'service_yx8cfak',
      'template_contact',
      templateParams,
      {
        publicKey: 'tRD14YfnN9gQ1mLp8',
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}; 