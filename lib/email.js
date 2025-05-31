import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
if (!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
  console.error('EmailJS public key is not defined');
}

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

export const sendJoinRequestEmail = async (projectLead, project, requester) => {
  try {
    // Format skills as a string if it's an array
    const formattedSkills = Array.isArray(requester.skills) 
      ? requester.skills.join(', ') 
      : requester.skills || 'Not specified';

    const templateParams = {
      to_name: projectLead.name,
      to_email: projectLead.email,
      from_name: requester.name,
      from_email: requester.email,
      project_name: project.title,
      skills: formattedSkills,
      experience: requester.experience || 'Not specified',
      availability: requester.availability || 'Not specified',
      message: requester.message || 'No additional message provided',
      project_link: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${project._id}`,
    };

    console.log('Sending join request email with params:', templateParams);

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOIN_REQUEST,
      templateParams
    );

    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', {
      error,
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOIN_REQUEST,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'defined' : 'undefined'
    });
    throw error;
  }
};

export const sendRequestStatusEmail = async (user, project, status, details = '') => {
  try {
    // Format the status to be more user-friendly
    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    const templateParams = {
      to_name: user.name,
      to_email: user.email,
      project_title: project.title,
      status: formattedStatus,
      updated_by: 'Project Lead',
      details: details || 'No additional details provided',
      project_link: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${project._id}`,
    };

    console.log('Sending status update email with params:', templateParams);

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_STATUS_UPDATE,
      templateParams
    );

    console.log('Status update email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending status update email:', {
      error,
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_STATUS_UPDATE,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'defined' : 'undefined'
    });
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

    console.log('Sending contact form email with params:', templateParams);

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams
    );

    console.log('Contact form email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending contact form email:', {
      error,
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? 'defined' : 'undefined'
    });
    throw error;
  }
}; 