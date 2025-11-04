import React, { useState } from "react";
import "./PaymentPage.css"; // ✅ ensure this file exists

function PaymentPage({ total, clearCart, setView }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setError("");

    if (!paymentMethod) {
      setError("⚠️ Please select a payment method!");
      return;
    }

    // ✅ Validate UPI
    if (paymentMethod === "UPI") {
      if (!upiId.trim()) {
        setError("⚠️ Please enter your UPI ID!");
        return;
      }
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{3,}$/;
      if (!upiRegex.test(upiId)) {
        setError("❌ Invalid UPI ID. Please check and try again!");
        return;
      }
    }

    // ✅ Validate Card
    if (paymentMethod === "CARD") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        setError("⚠️ Please fill all card details!");
        return;
      }
      if (!/^\d{16}$/.test(cardNumber)) {
        setError("❌ Invalid card number. Must be 16 digits!");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        setError("❌ Invalid expiry format. Use MM/YY!");
        return;
      }
      if (!/^\d{3}$/.test(cardCvv)) {
        setError("❌ Invalid CVV. Must be 3 digits!");
        return;
      }
    }

    // ✅ Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clearCart && clearCart();
      setView && setView("paymentSuccess");
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="payment-page">
      <div className="payment-box">
        <h2>💳 Payment Page</h2>
        <p>Your total amount is: ₹{total}</p>

        <div className="payment-options">
          {/* ---- UPI ---- */}
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-label">UPI / Google Pay / PhonePe</span>
          </label>

          {paymentMethod === "UPI" && (
            <input
              type="text"
              placeholder="Enter your UPI ID (e.g. name@upi)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="payment-input"
            />
          )}

          {/* ---- CARD ---- */}
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="CARD"
              checked={paymentMethod === "CARD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-label">Credit / Debit Card</span>
          </label>

          {paymentMethod === "CARD" && (
            <div className="card-details">
              <input
                type="text"
                placeholder="Card Number (16 digits)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="payment-input"
              />
              <input
                type="text"
                placeholder="Name on Card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="payment-input"
              />
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className="payment-input"
              />
              <input
                type="password"
                placeholder="CVV"
                maxLength="3"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                className="payment-input"
              />
            </div>
          )}

          {/* ---- COD ---- */}
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="payment-label">Cash on Delivery</span>
          </label>
        </div>

        {/* 🔴 Animated Error */}
        {error && <p className={`error-message show`}>{error}</p>}

        {/* 🌀 Loading Spinner */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Processing your payment...</p>
          </div>
        )}

        <button
          onClick={handlePayment}
          className="payment-btn"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
