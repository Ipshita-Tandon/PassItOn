import React, { useState } from "react";
import { Search, User, ShoppingCart, Accessibility } from 'lucide-react';
import ReadAloud from "./readAloud.js";
import "../pages/homepage.css";

const Navbar = () => {
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);

  const toggleReadAloud = () => {
    const newState = !accessibilityEnabled;
    setAccessibilityEnabled(newState);
  };

  return (
    <header className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <nav>
        <div className="nav-left">
          <a href="/" className="logo-container">
            <div className="logo">
              <img 
                src="images/logo2.png" 
                alt="Pass It On Logo"
              />
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="/homepage" className="nav-link">Home</a></li>
            <li><a href="/categories" className="nav-link">Categories</a></li>
            <li><a href="/book-club" className="nav-link">Book Club</a></li>
            <li><a href="/find-teammates" className="nav-link">Find Teammates</a></li>
            <li><a href="/contact" className="nav-link">Contact Us</a></li>
            <li><a href="/about" className="nav-link">About Us</a></li>
          </ul>
        </div>

        {/* Right side icons */}
        <div className="nav-icons">
          <button className="icon-button" aria-label="Search">
            <Search size={24} />
          </button>
          
          {/* Toggle Read Aloud + Announce */}
          <button
            className="icon-button"
            aria-label="Accessibility"
            onClick={toggleReadAloud}
          >
            <Accessibility size={24} />
          </button>

          <button className="icon-button" aria-label="Shopping Cart">
            <ShoppingCart size={24} />
          </button>
          <button className="icon-button" aria-label="User Profile">
            <User size={24} />
          </button>
        </div>
      </nav>

      {/* Always load ReadAloud but control its activation */}
      <ReadAloud accessibilityEnabled={accessibilityEnabled} />
    </header>
  );
};

export default Navbar;