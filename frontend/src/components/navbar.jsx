import React from 'react';
import { Search, User, ShoppingCart, Accessibility } from 'lucide-react';
import "../pages/homepage.css";

const Navbar = () => {
  return (
    <header className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <nav>
        <div className="nav-left">
          {/* Logo */}
          <a href="/" className="logo-container">
            <div className="logo">
              <img 
                src="images/logo2.png" 
                alt="Pass It On Logo"
              />
            </div>
          </a>
          
          {/* Nav Links */}
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
          <button className="icon-button">
            <Search size={24} />
          </button>
          <button className="icon-button">
            <Accessibility size={24} />
          </button>
          <button className="icon-button">
            <ShoppingCart size={24} />
          </button>
          <button className="icon-button">
            <User size={24} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
