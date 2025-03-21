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
      imageUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      imageAlt: 'Engineering Graphics Drafter'
    },
    {
      id: 2,
      name: 'Engineering Physics HK Malik',
      description: 'Physics Fundamentals',
      price: '₹200',
      imageUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      imageAlt: 'Engineering Physics Book'
    },
    {
      id: 3,
      name: 'Algorithms by Cormen',
      description: 'DSA Fundamentals',
      price: '₹300',
      imageUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
      imageAlt: 'Algorithms Book'
    },
    {
      id: 4,
      name: "Harry Potter Philosopher's Stone",
      description: '1st book of the series',
      price: '₹150',
      imageUrl: '/lovable-uploads/98011149-1e99-4d24-a587-063f0f72172d.png',
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