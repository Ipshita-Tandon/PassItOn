import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookDetails.css';
import { Heart, ShoppingCart, Search, User } from "lucide-react";
import toast from 'react-hot-toast';
import supabase from '../supabase/supabase';
import ContactSellerButton from '../components/contactSellerButton.jsx';

const BookDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data: bookData, error: bookError } = await supabase
          .from('Products')
          .select('*')
          .eq('id', id)
          .single();

        if (bookError) throw bookError;

        if (bookData) {
          const { data: sellerData, error: sellerError } = await supabase
          .from('exposed_users')
          .select('display_name, email')
          .eq('id', bookData.sellerId)
          .single();
        
        
        

          if (sellerError) console.error('Error fetching seller:', sellerError);

          setBook({
            ...bookData,
            seller: sellerData ? sellerData.display_name : 'Unknown Seller',
            sellerEmail: sellerData?.email || ''
          });
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        toast.error("Failed to load book details. Please try again.");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const images = [
    "/lovable-uploads/b2d34808-a22d-4921-9a50-8cb9dbb70e22.png",
    "/book-cover-1.jpg",
    "/book-cover-2.jpg",
    "/book-cover-3.jpg"
  ];

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="error-container">
        <p>Book not found!</p>
        <Link to="/" className="back-link">Return to Search</Link>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-separator">›</span>
        <Link to="/" className="breadcrumb-link">{book.category}</Link>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">{book.title}</span>
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
            <img src={book.image || images[activeImage]} alt={book.title} className="main-book-img" />
            <div className="decorative-elements">
              <div className="decorative-leaf left-top"></div>
              <div className="decorative-leaf left-middle"></div>
              <div className="decorative-leaf right-middle"></div>
              <div className="decorative-leaf right-bottom"></div>
            </div>
          </div>
        </div>

        <div className="book-info-container">
          <h1 className="book-title">{book.title}</h1>
          <p className="book-author">by {book.author}</p>
          
          {book.authors && (
            <div className="authors-list">
              {book.authors.map((author, index) => (
                <p key={index} className="author-name">{author.toUpperCase()}</p>
              ))}
            </div>
          )}
          
          <div className="book-price">
            <span className="price-value">₹{book.price}</span>
          </div>
          
          <div className="book-description">
            <p>{book.description || "No description available for this book."}</p>
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

          {/* Contact Seller Button */}
          <div className="contact-seller-button-wrapper">
          <ContactSellerButton book={book} />
          </div>
          
          <div className="book-details-table">
            <div className="details-row">
              <div className="details-label">Publisher:</div>
              <div className="details-value">{book.publisher || "Not specified"}</div>
              <div className="details-label publication-date">Category</div>
              <div className="details-value">{book.category}</div>
            </div>
            
            <div className="details-row">
              <div className="details-label">Subject:</div>
              <div className="details-value">{book.subject}</div>
              <div className="details-label">Branch:</div>
              <div className="details-value">{book.branch}</div>
            </div>
            
            <div className="details-row">
              <div className="details-label">Semester:</div>
              <div className="details-value">Sem {book.semester}</div>
              <div className="details-label">Seller</div>
              <div className="details-value">{book.seller || "Unknown"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

