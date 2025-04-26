import emailjs from '@emailjs/browser';

export default function sendContactEmail({ sellerEmail, buyerName, buyerEmail, message }) {
  const templateParams = {
    to: sellerEmail,
    name: buyerName,
    from: buyerEmail,
    email: buyerEmail,
    message
  };

  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  console.log('Sending email with:', templateParams);
  console.log('Using service:', serviceId, 'template:', templateId);

  return emailjs.send(serviceId, templateId, templateParams, publicKey)
    .catch((error) => {
      console.error("EmailJS error:", error);
    });
}
