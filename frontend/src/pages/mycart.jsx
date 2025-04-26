import React, { useState } from 'react';
import './mycart.css';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import OrderSummary from '../components/OrderSummary';
import Navbar from '../components/navbar';

const MyCart = () => {
  // Sample cart items data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vintage Leather Wallet",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=100&h=100",
      price: 39.99,
      quantity: 1,
      seller: "LeatherCrafts",
    },
    {
      id: 2,
      name: "Wireless Bluetooth Headphones",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=100&h=100",
      price: 79.99,
      quantity: 2,
      seller: "TechGadgetsPlus",
    },
    {
      id: 3,
      name: "Handcrafted Ceramic Mug Set",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=100&h=100",
      price: 24.99,
      quantity: 1,
      seller: "ArtisanPottery",
    }
  ]);

  // Update item quantity
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  return (
    <div className="shopping-cart-container">
      <header className="cart-header">
        <h1>My eBay Cart</h1>
        <p>{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
      </header>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  updateQuantity={updateQuantity} 
                  removeItem={removeItem} 
                />
              ))}
            </>
          ) : (
            <EmptyCart />
          )}
        </div>

        {cartItems.length > 0 && (
          <OrderSummary 
            subtotal={subtotal} 
            shipping={shipping} 
            total={total} 
          />
        )}
      </div>
    </div>
  );
};

export default MyCart;