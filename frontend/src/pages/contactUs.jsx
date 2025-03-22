import React from 'react';
import './contactUs.css';
import Navbar from '../components/navbar';

const ContactUs = () => {
  return (
    <div className="contact-container">
        <Navbar/>
      <h2 className="contact-title">Contact Us</h2>
      
      <div className="contact-content">
        {/* Illustration */}
        <div className="contact-image-container">
          <img src={"https://i.pinimg.com/736x/9f/ce/c2/9fcec281834ca98e08f1587e8943e983.jpg"} alt="contactus" className="contact-image" />
        </div>
        
        {/* Contact Form */}
        <div className="contact-form-container">
          <form className="contact-form">
            <div className="form-field">
              <input
                type="text"
                placeholder="Name"
                className="form-input"
              />
            </div>
            <div className="form-field">
              <input
                type="email"
                placeholder="Email"
                className="form-input"
              />
            </div>
            <div className="form-field">
              <textarea
                placeholder="Any Queries/Feedback"
                rows={4}
                className="form-textarea"
              />
            </div>
            <button
              type="submit"
              className="submit-button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
