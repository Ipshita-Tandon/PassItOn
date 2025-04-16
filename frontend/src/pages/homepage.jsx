<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import "./homepage.css";
>>>>>>> 274b65dbfc792f6109c2469a7abd88d7322e99da
import Popular from './popular.jsx';
import Explore from './explore.jsx';
import Testimonials from './testimonials.jsx';
import Footer from '../components/footer.jsx';
import ContactUs from './contactUs.jsx';
import Search from './search.jsx';
import Doyouknowus from './Doyouknowus.jsx';
<<<<<<< HEAD
import Navbar from '../components/navbar.jsx'; // Make sure you import your Navbar here
=======
import BookDetails from './BookDetails.jsx';
>>>>>>> 274b65dbfc792f6109c2469a7abd88d7322e99da

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <main className="flex-grow">
        <div className="hero-container">
          <div className="hero-section">
            <div className="hero-content-grid">
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
<<<<<<< HEAD
=======
                <button
                  className={isLoaded ? 'animate-slide-up cta-button' : 'opacity-0 cta-button'}
                  style={{ animationDelay: '0.9s' }}
                  onClick={() => navigate('/search')}
                >
                  Shop Now
                </button>
>>>>>>> 274b65dbfc792f6109c2469a7abd88d7322e99da
              </div>
              <div className={isLoaded ? 'animate-fade-in hero-image' : 'opacity-0 hero-image'} style={{ animationDelay: '0.7s' }}>
                <div className="book-image-container">
                  <div className="hanging-light">
                    <img src="/images/hanging-light.png" alt="Hanging Light" className="hanging-light-image" />
                  </div>
                  <img src="/images/books.png" alt="Stack of Books" className="books-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Explore />
      <Popular />
      <Testimonials />
      <Doyouknowus />
      <Footer />
    </div>
  );
};

export default HomePage;
