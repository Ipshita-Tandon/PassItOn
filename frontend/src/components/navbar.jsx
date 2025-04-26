import React, { useState, useRef, useEffect } from "react";
import { Search, User, ShoppingCart, Accessibility } from 'lucide-react';
import ReadAloud from "./readAloud.js";
import "../pages/homepage.css";

const Navbar = () => {
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleReadAloud = () => {
    setAccessibilityEnabled(!accessibilityEnabled);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <li><a href="/teammates" className="nav-link">Find Teammates</a></li>
            <li><a href="/contact" className="nav-link">Contact Us</a></li>
            <li><a href="/about" className="nav-link">About Us</a></li>
            {/* Removed MyProfile and MyCart from here */}
          </ul>
        </div>

        {/* Right side icons */}
        <div className="nav-icons">
          <button className="icon-button" aria-label="Search">
            <Search size={24} />
          </button>
          
          <button
            className="icon-button"
            aria-label="Accessibility"
            onClick={toggleReadAloud}
          >
            <Accessibility size={24} />
          </button>

          {/* User dropdown container */}
          <div className="user-dropdown-container" ref={dropdownRef}>
            <button 
              className="icon-button" 
              aria-label="User Profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User size={24} />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="/techprofile" className="dropdown-item">
                  <User size={16} className="dropdown-icon" /> My Profile
                </a>
                <a href="/wishlist" className="dropdown-item">
                  <ShoppingCart size={16} className="dropdown-icon" /> Wishlist
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <ReadAloud accessibilityEnabled={accessibilityEnabled} />
    </header>
  );
};

export default Navbar;