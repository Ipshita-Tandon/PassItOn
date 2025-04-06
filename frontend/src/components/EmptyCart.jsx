import React from 'react';
import { ShoppingBag } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <ShoppingBag size={48} />
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything to your cart yet.</p>
      <button className="continue-shopping">Start Shopping</button>
    </div>
  );
};

export default EmptyCart;
