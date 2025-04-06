import React, { useState } from 'react';
import './BookDetails.css';
import { Heart, ShoppingCart, Search, User } from "lucide-react";

const BookDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    "/lovable-uploads/b2d34808-a22d-4921-9a50-8cb9dbb70e22.png",
    "/book-cover-1.jpg",
    "/book-cover-2.jpg",
    "/book-cover-3.jpg"
  ];

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="book-details-container">
      <div className="navigation-bar">
        <div className="logo-container">
          <img src="/lovable-uploads/d1449ea2-9cac-44d1-8fd0-4aff701d5851.png" alt="" className="logo" />
        </div>
        <div className="navigation-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Categories</a>
          <a href="#" className="nav-link">Book Club</a>
          <a href="#" className="nav-link">Contact Us</a>
          <a href="#" className="nav-link">About Us</a>
        </div>
        <div className="navigation-icons">
          <div className="search-icon">
            <Search className="icon" />
          </div>
          <div className="accessibility-icon">
            <span className="icon">i</span>
          </div>
          <div className="cart-icon">
            <ShoppingCart className="icon" />
          </div>
          <div className="profile-icon">
            <User className="icon" />
          </div>
        </div>
      </div>

      <div className="breadcrumb">
        <a href="#" className="breadcrumb-link">Home</a>
        <span className="breadcrumb-separator">›</span>
        <a href="#" className="breadcrumb-link">Course books</a>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">Introduction to Algorithms</span>
      </div>

      <div className="book-details-main">
        <div className="book-images-container">
          <div className="book-thumbnails">
            {images.slice(1).map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${activeImage === index + 1 ? 'active' : ''}`}
                onClick={() => setActiveImage(index + 1)}
              >
                <img src={image} alt={`Book image ${index + 1}`} className="thumbnail-img" />
              </div>
            ))}
          </div>
          <div className="book-main-image">
            <div className="this-is-the-page">
              <div className="page-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="page-text">This is the page</div>
            </div>
            <img src={images[activeImage]} alt="Introduction to Algorithms" className="main-book-img" />
            <div className="decorative-elements">
              <div className="decorative-leaf left-top"></div>
              <div className="decorative-leaf left-middle"></div>
              <div className="decorative-leaf right-middle"></div>
              <div className="decorative-leaf right-bottom"></div>
            </div>
          </div>
        </div>

        <div className="book-info-container">
          <h1 className="book-title">Introduction to Algorithms</h1>
          <p className="book-author">Thomas H. Cormen</p>
          
          <div className="authors-list">
            <p className="author-name">THOMAS H. CORMEN</p>
            <p className="author-name">CHARLES E. LEISERSON</p>
            <p className="author-name">RONALD L. RIVEST</p>
            <p className="author-name">CLIFFORD STEIN</p>
          </div>
          
          <div className="book-rating">
            <div className="stars">
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star filled">★</span>
              <span className="star half-filled">★</span>
            </div>
            <span className="rating-value">4.5</span>
          </div>
          
          <div className="book-price">
            <span className="price-value">₹300</span>
          </div>
          
          <div className="book-description">
            <p>This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in-depth, yet makes their design and analysis accessible to all levels of readers.</p>
          </div>
          
          <div className="quantity-control">
            <button className="quantity-btn decrease" onClick={decrementQuantity}>-</button>
            <span className="quantity-value">{quantity}</span>
            <button className="quantity-btn increase" onClick={incrementQuantity}>+</button>
          </div>
          
          <div className="action-buttons">
            <button className="add-to-cart-btn">
              <ShoppingCart size={16} />
              Add to cart
            </button>
            <button className="favorite-btn">
              <Heart size={16} />
              Favorite
            </button>
          </div>
          
          <div className="book-details-table">
            <div className="details-row">
              <div className="details-label">Publisher:</div>
              <div className="details-value">Margaret K. Books</div>
              <div className="details-label publication-date">Publication date:</div>
              <div className="details-value">March 3, 2020</div>
            </div>
            
            <div className="details-row">
              <div className="details-label">Language:</div>
              <div className="details-value">English</div>
              <div className="details-label">Reading age:</div>
              <div className="details-value">14+</div>
            </div>
            
            <div className="details-row">
              <div className="details-label">Print length:</div>
              <div className="details-value">592 pages</div>
              <div className="details-label">Dimensions:</div>
              <div className="details-value">6 × 1.8 × 9 inches</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
