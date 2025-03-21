import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import "./homepage.css";

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen"> 
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="hero-container">
          <div className="hero-section">
            <div className="hero-content-grid">
              {/* Left content */}
              <div className="hero-content">
                <h1 className={isLoaded ? 'animate-slide-up hero-title' : 'opacity-0 hero-title'} style={{ animationDelay: '0.3s' }}>
                  Don't just keep it...
                </h1>
                <h2 className={isLoaded ? 'animate-slide-up hero-subtitle' : 'opacity-0 hero-subtitle'} style={{ animationDelay: '0.5s' }}>
                  Pass it on
                </h2>
                <p className={isLoaded ? 'animate-slide-up hero-text' : 'opacity-0 hero-text'} style={{ animationDelay: '0.7s' }}>
                  Explore different categories. Find the best deals.
                </p>
                <button className={isLoaded ? 'animate-slide-up cta-button' : 'opacity-0 cta-button'} style={{ animationDelay: '0.9s' }}>
                  Shop Now
                </button>
              </div>
              
              {/* Right image - stack of books */}
              <div className={isLoaded ? 'animate-fade-in hero-image' : 'opacity-0 hero-image'} style={{ animationDelay: '0.7s' }}>
                <div className="book-image-container">
                  {/* Hanging light */}
                  <div className="hanging-light">
                    <img src="/images/hanging-light.png" alt="Hanging Light" className="hanging-light-image"/>
                  </div>

                  {/* Books stack image */}
                  <img src="/images/books.png" alt="Stack of Books" className="books-image"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;


