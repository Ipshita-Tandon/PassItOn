import React, { useState } from 'react';
import { toast } from "sonner";
import './Doyouknowus.css';

const Doyouknowus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      toast.success("Successfully subscribed to our newsletter!");
      setName('');
      setEmail('');
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="explore-container">
      <div className="content-wrapper">
        <div className="left-section">
          <h1 className="heading">Did you know us?</h1>
          <p className="description">
            We are about books and our purpose is to show you the book that can
            change your life or transport you to a better world. BWorld
            collaborates with the most popular publishers just for your delight.
          </p>
          <p className="subscription-message">
            If you love books, you must subscribe to our newsletter.
          </p>

          <form onSubmit={handleSubmit} className="subscription-form">
            <input
              type="text"
              placeholder="Your name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
        <div className="right-section">
          <div className="map-container">
            <img 
              src="../images/map.png" 
              alt="Location Map" 
              className="map-image" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doyouknowus;