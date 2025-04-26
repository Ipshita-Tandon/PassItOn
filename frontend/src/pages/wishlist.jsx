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
    <div className="wishlist-container">
      <header className="header">
        <Link to="/" className="logo">
          <img src="images/logo2.png" alt="PassItOn Logo" className="logo-image" />
          PassItOn
        </Link>
      </header>
      
      <div className="wishlist-header">
        <div className="heart-icon">♥</div>
        <h1 style={{ color: 'red' }}>My Wishlist</h1>
      </div>
      
      <div className="wishlist-table">
        <div className="table-header">
          <div></div>
          <div className="column-header">Product name</div>
          <div className="column-header">Unit price</div>
          <div className="column-header">Qty</div>
          <div className="column-header">Stock status</div>
          <div className="column-header"></div>
        </div>
        
        {wishlistItems.map((item) => (
          <div key={item.id} className="table-row">
            <div className="delete-icon" onClick={() => handleDelete(item.id)}>🗑</div>
            <div className="product-info">
              <img src={item.image} alt={item.name} className="product-image" />
              <span className="product-name">{item.name}</span>
            </div>
            <div className="price-info">
              {item.originalPrice !== item.salePrice && (
                <span className="original-price">{item.originalPrice}</span>
              )}
              <span className="sale-price">₹{item.salePrice}</span>
            </div>
            <div className="quantity">{item.quantity}</div>
            <div className="stock-status">{item.status}</div>
            <div className="action-column">
              <div className="date-added">Added on: {item.dateAdded}</div>
              <button className="see-more">See more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;