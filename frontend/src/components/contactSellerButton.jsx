import React, { useState, useEffect } from 'react';
import sendContactEmail from '../emailService.js';
import { useParams } from 'react-router-dom';
import supabase from '../supabase/supabase';
import './contactSellerButton.css';

const ContactSellerButton = ({ book }) => {
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sellerEmail, setSellerEmail] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [bidAmount, setBidAmount] = useState(''); // <-- Added state for bid input
  const { id } = useParams();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setShowInput(false);
      setBuyerEmail('');
      setBidAmount(''); // <-- Reset bid input
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending the message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <button
        className="contact-seller-btn"
        onClick={() => setShowInput(true)}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Contact Seller'}
      </button>

      {showInput && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxWidth: '300px',
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            required
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />

          <input
            type="text"
            placeholder="Add bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#0f766e',
              color: 'white',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.3s',
            }}
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactSellerButton;
