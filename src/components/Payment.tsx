import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export function Payment() {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { user } = useAuthStore();

  const handleMpesaPayment = async () => {
    try {
      const response = await axios.post('/api/mpesa', {
        phone: phoneNumber,
        amount: amount,
        userId: user.id,
      });
      // Handle response
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const handleCardPayment = async () => {
    try {
      const response = await axios.post('/api/stripe', {
        amount: amount,
        userId: user.id,
      });
      // Handle Stripe payment
    } catch (error) {
      console.error('Card payment failed:', error);
    }
  };

  return (
    <div className="payment-container">
      <h2>Purchase Tokens</h2>
      <div className="payment-options">
        <div className="mpesa-option">
          <h3>Pay with M-Pesa</h3>
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleMpesaPayment}>Pay with M-Pesa</button>
        </div>
        <div className="card-option">
          <h3>Pay with Card</h3>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleCardPayment}>Pay with Card</button>
        </div>
      </div>
    </div>
  );
}