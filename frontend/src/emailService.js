// src/emailService.js
import emailjs from '@emailjs/browser';

export function sendContactEmail({ sellerName, sellerEmail, buyerName, buyerEmail, message }) {
  const templateParams = {
    sellerName,
    sellerEmail,
    buyerName,
    buyerEmail,
    message,
  };

  return emailjs.send(
    process.env.REACT_APP_EMAILJS_SERVICE_ID,
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    templateParams,
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  );
}
