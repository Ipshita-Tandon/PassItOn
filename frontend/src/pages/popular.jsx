import React from 'react';
import './popular.css';

const Popular = () => {
  // Product data with the exact images from the screenshot
  const products = [
    {
      id: 1,
      name: 'Engineering Graphics Drafter',
      description: 'For accurate drawings',
      price: '₹100',
      imageUrl: 'https://apollo.olx.in/v1/files/egnerwyiwex12-IN/image',
      imageAlt: 'Engineering Graphics Drafter'
    },
    {
      id: 2,
      name: 'Engineering Physics HK Malik',
      description: 'Physics Fundamentals',
      price: '₹200',
      imageUrl: 'https://m.media-amazon.com/images/I/71eV-iAVGwL._AC_UF1000,1000_QL80_.jpg',
      imageAlt: 'Engineering Physics Book'
    },
    {
      id: 3,
      name: 'Algorithms by Cormen',
      description: 'DSA Fundamentals',
      price: '₹300',
      imageUrl: 'https://m.media-amazon.com/images/I/51U7VqFciNL._AC_UF1000,1000_QL80_.jpg',
      imageAlt: 'Algorithms Book'
    },
    {
      id: 4,
      name: "Harry Potter Philosopher's Stone",
      description: '1st book of the series',
      price: '₹150',
      imageUrl: 'https://m.media-amazon.com/images/I/81q77Q39nEL.jpg',
      imageAlt: 'Harry Potter Book'
    }
  ];

  return (
    <div className="products-container">
      <h1 className="products-title">Popular Products</h1>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.imageUrl} 
                alt={product.imageAlt}
                className={`product-image product-image-${product.id}`}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;