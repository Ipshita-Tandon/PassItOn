import React, { useState, useEffect } from 'react';
import sendContactEmail from '../emailService.js';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabase';

const ContactSellerButton = ({ book }) => {
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sellerEmail, setSellerEmail] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const { id } = useParams(); // Optional, depending on how you're using it

  // Fetch seller email on mount
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        console.log('Fetching seller data for book with ID:', book.id);
        const { data: sellerData, error } = await supabase
          .from('Products')
          .select('SellerEmail')
          .eq('id', book.id)
          .single();

        if (error) {
          console.error('Error fetching seller data:', error);
        } else if (sellerData?.SellerEmail) {
          setSellerEmail(sellerData.SellerEmail);
        } else {
          console.warn('No seller email found in database.');
        }
      } catch (err) {
        console.error('Error fetching seller:', err.message || err);
      }
    };

    if (book?.sellerId) {
      fetchSellerData();
    }
  }, [book]);

  // Handle sending the email
  const handleSubmit = async (e) => {
    e.preventDefault();
    
  console.log('Buyer Email:', buyerEmail);
  console.log('Seller Email:', sellerEmail);

 

    if (!sellerEmail || !buyerEmail) {
      alert('Missing email information.');
      return;
    }

    const emailData = {
      sellerEmail,
      buyerEmail,
      buyerName: buyerEmail.split('@')[0],
      message: `Hello, I am interested in the book "${book.title}". Please provide more details.`,
    };

    setLoading(true);

    try {
      const response = await sendContactEmail(emailData);
      console.log('Email sent:', response);
      alert('Your message has been sent to the seller!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending the message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="contact-seller-btn"
        onClick={() => setShowInput(true)}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Contact Seller'}
      </button>

      {showInput && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Send Email
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactSellerButton;





