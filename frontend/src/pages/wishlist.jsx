import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      image: 'https://m.media-amazon.com/images/I/71eV-iAVGwL._AC_UF1000,1000_QL80_.jpg',
      name: 'Engineering Physics HK Malik',
      salePrice: 200,
      status: 'In Stock',
      dateAdded: 'March 5, 2025',
      quantity: 1
    },
    {
      id: 2,
      image: 'https://m.media-amazon.com/images/I/51U7VqFciNL._AC_UF1000,1000_QL80_.jpg',
      name: 'Algorithms by Cormen',
      salePrice: 600,
      status: 'In Stock',
      dateAdded: 'February 6, 2025',
      quantity: 2
    },
    {
      id: 3,
      image: 'https://apollo.olx.in/v1/files/egnerwyiwex12-IN/image',
      name: 'Engineering Graphics Drafter',
      salePrice: 100,
      status: 'In Stock',
      dateAdded: 'March 25, 2025',
      quantity: 1
    }
  ]);

  const handleDelete = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="wwishlist-container">
      <header className="wheader">
        <Link to="/" className="wlogo">
          <img src="images/logo2.png" alt="PassItOn Logo" className="wlogo-image" />
          PassItOn
        </Link>
      </header>
      
      <div className="wwishlist-header">
        <div className="wheart-icon">♥</div>
        <h1 style={{ color: 'red' }}>My Wishlist</h1>
      </div>
      
      <div className="wwishlist-table">
        <div className="wtable-header">
          <div></div>
          <div className="wcolumn-header">Product name</div>
          <div className="wcolumn-header">Unit price</div>
          <div className="wcolumn-header">Qty</div>
          <div className="wcolumn-header">Stock status</div>
          <div className="wcolumn-header"></div>
        </div>
        
        {wishlistItems.map((item) => (
          <div key={item.id} className="wtable-row">
            <div className="wdelete-icon" onClick={() => handleDelete(item.id)}>🗑</div>
            <div className="wproduct-info">
              <img src={item.image} alt={item.name} className="wproduct-image" />
              <span className="wproduct-name">{item.name}</span>
            </div>
            <div className="wprice-info">
              {item.originalPrice !== item.salePrice && (
                <span className="woriginal-price">{item.originalPrice}</span>
              )}
              <span className="wsale-price">₹{item.salePrice}</span>
            </div>
            <div className="wquantity">{item.quantity}</div>
            <div className="wstock-status">{item.status}</div>
            <div className="waction-column">
              <div className="wdate-added">Added on: {item.dateAdded}</div>
              <button className="wsee-more">See more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
