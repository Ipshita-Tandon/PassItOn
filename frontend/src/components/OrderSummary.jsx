import React from 'react';
import { CreditCard } from 'lucide-react';

const OrderSummary = ({ subtotal, shipping, total }) => {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="checkout-btn">
        <CreditCard size={16} /> Proceed to Checkout
      </button>
      <button className="continue-shopping">Continue Shopping</button>
    </div>
  );
};

export default OrderSummary;