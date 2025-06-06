'use client';

import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("tRD14YfnN9gQ1mLp8", {
  limitRate: true,
  blockHeadless: false
});

export default emailjs; 