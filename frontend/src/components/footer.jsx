import React from "react";
import { MailOutlined, GithubFilled, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import "./footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-info">
          <h2 className="footer-title">Inception</h2>
          <p className="footer-description">Efficiently manage and track your projects</p>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <a href="mailto:your-email@example.com" className="social-icon">
            <MailOutlined className="icon" />
          </a>
          <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="social-icon">
            <GithubFilled className="icon" />
          </a>
          <a href="https://twitter.com/your-username" target="_blank" rel="noopener noreferrer" className="social-icon">
            <TwitterOutlined className="icon" />
          </a>
          <a href="https://instagram.com/your-username" target="_blank" rel="noopener noreferrer" className="social-icon">
            <InstagramOutlined className="icon" />
          </a>
        </div>

        {/* Subscription Form */}
        <div className="footer-subscribe">
          <form action="/subscribe" method="post" className="subscribe-form">
            <input type="email" name="email" placeholder="Enter your email" className="subscribe-input" required />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
