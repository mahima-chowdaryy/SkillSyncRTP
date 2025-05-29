import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

export const sendJoinRequestEmail = async (projectLead, project, requester) => {
  try {
    const templateParams = {
      to_email: projectLead.email,
      to_name: projectLead.name,
      from_name: requester.name,
      from_email: requester.email,
      project_title: project.title,
      skills: requester.skills,
      experience: requester.experience,
      availability: requester.availability,
      message: requester.message,
      project_link: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${project._id}`,
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_JOIN_REQUEST,
      templateParams
    );
  } catch (error) {
    console.error('Error sending email:', error);
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
      project_link: `${process.env.NEXT_PUBLIC_APP_URL}/projects/${project._id}`,
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_STATUS_UPDATE,
      templateParams
    );
  } catch (error) {
    console.error('Error sending email:', error);
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
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT,
      templateParams
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 