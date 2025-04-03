import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

const CartItem = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-seller">Seller: {item.seller}</p>
        <div className="item-actions">
          <div className="quantity-control">
            <button onClick={() => updateQuantity(item.id, -1)}>
              <Minus size={16} />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}>
              <Plus size={16} />
            </button>
          </div>
          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            <X size={16} /> Remove
          </button>
        </div>
      </div>
      <div className="item-price">
        <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
        <p className="item-unit-price">${item.price.toFixed(2)} each</p>
      </div>
    </div>
  );
};

export default CartItem;
