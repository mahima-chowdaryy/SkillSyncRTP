import emailjs from '@emailjs/nodejs';

// Initialize EmailJS with your public key
emailjs.init('tRD14YfnN9gQ1mLp8');

export const sendCollaborationEmail = async (data) => {
  try {
    console.log('Starting email send process with data:', {
      toEmail: data.toEmail,
      fromName: data.fromName,
      fromEmail: data.fromEmail,
      type: data.type,
      projectTitle: data.projectTitle
    });
    
    // Validate required fields
    if (!data.toEmail || !data.fromName || !data.fromEmail || !data.message) {
      console.error('Missing required email fields:', {
        toEmail: data.toEmail,
        fromName: data.fromName,
        fromEmail: data.fromEmail,
        message: data.message
      });
      throw new Error('Missing required email fields');
    }
    
    // For project collaboration requests, always send to team lead
    const toEmail = data.type === 'project' 
      ? '23r21a6759@mlrit.ac.in'  // Team lead email
      : data.toEmail;             // User's email for student collaboration

    console.log('Using recipient email:', toEmail);

    const templateParams = {
      to_email: toEmail,
      to_name: data.type === 'project' ? 'Team Lead' : data.toName,
      from_name: data.fromName,
      from_email: data.fromEmail,
      subject: data.subject || 'New Collaboration Request',
      message: data.message,
      type: data.type,
      project_title: data.projectTitle || '',
      skills: data.skills || '',
      availability: data.availability || '',
      action_link: data.actionLink || '',
    };

    console.log('Email template params:', templateParams);

    // Send the email
    const result = await emailjs.send(
      'service_yx8cfak',  // Your EmailJS service ID
      'template_project_collab',  // Your EmailJS template ID for project collaboration
      templateParams,
      {
        publicKey: 'tRD14YfnN9gQ1mLp8',
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    console.log('EmailJS response:', result);
    return result;
  } catch (error) {
    console.error('Detailed email error:', {
      message: error.message,
      text: error.text,
      status: error.status,
      stack: error.stack,
      data: data
    });
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