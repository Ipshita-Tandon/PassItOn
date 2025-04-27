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
          Welcome to your one-stop destination for all things educational and inspiring! From textbooks and bestselling novels to everyday stationery and unique finds, our collection is curated to support students, readers, and lifelong learners alike. Whether you're stocking up for a new semester or just looking for your next great read, you’ll find quality items at great prices — all with the trust and care of the PassItOn spirit.


          </p>
          <p className="subscription-message">
          For book lovers and savvy shoppers alike, subscribe to our newsletter for exclusive deals and new arrivals!
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