import React from 'react';
import './contactUs.css';
import Navbar from '../components/navbar';

const ContactUs = () => {
  return (
    <div className="contact-container">
        <Navbar/>
        <div className="section-header">
            <h1 className="title">
              Get <span className="highlight">In Touch</span>
            </h1>
            <div className="divider"></div>
          </div>
      
      <div className="contact-content">
        {/* Illustration */}
        <div className="contact-image-container">
          <img src={'images/contactus.png'} alt="contactus" className="contact-image" />
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
