import emailjs from '@emailjs/browser';

export function sendContactEmail(sellerName, sellerEmail, buyerName, buyerEmail, message) {
  const templateParams = {
    sellerName,
    sellerEmail,
    buyerName,
    buyerEmail,
    message,
  };

  emailjs.send(
    'your_service_id',
    'template_knhkwdh',
    templateParams,
    'your_public_key'
  ).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
    },
    (err) => {
      console.error("FAILED...", err);
    }
  );
}
