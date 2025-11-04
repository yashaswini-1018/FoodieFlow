import React from "react";

function PaymentSuccess({ setView }) {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>✅ Payment Successful!</h2>
      <p>Thank you for your order. Your delicious food is on the way! 🍽️</p>

      <button
        onClick={() => setView("home")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#ff7043",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default PaymentSuccess;
