import React from 'react';
import emailjs from '@emailjs/browser';
import supabase from '../supabase/supabase'; // ✅ correct for default export


// import { useUser } from '@supabase/auth-helpers-react'; // ❌ remove if not using it

const ContactSellerButton = ({ sellerId }) => {
  const handleContact = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser(); // ✅ use this instead of useUser

    if (!user) {
      alert('Please log in to contact the seller.');
      return;
    }

    const { data: sellerData, error } = await supabase
      .from('users')
      .select('email, display_name')
      .eq('uid', sellerId)
      .single();

    if (error) {
      console.error('Failed to fetch seller data:', error.message);
      alert('Failed to fetch seller info.');
      return;
    }

    const templateParams = {
      from_name: user.email,
      to_name: sellerData.display_name,
      to_email: sellerData.email,
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert('Email sent successfully!');
    } catch (err) {
      console.error('Failed to send email:', err);
      alert('Failed to send email.');
    }
  };

  return (
    <button onClick={handleContact} className="contact-seller-btn">
      Contact Seller
    </button>
  );
};

export default ContactSellerButton;
