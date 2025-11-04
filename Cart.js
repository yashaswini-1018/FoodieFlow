import React from "react";

function Cart({
  cartItems,
  addToCart,
  removeFromCart,
  removeItemCompletely,
  clearCart,
  setView,
  setTotal
}) {
  // calculate total
  const total = cartItems.reduce(
    (sum, it) => sum + Number(it.price) * it.qty,
    0
  );

  return (
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty. Add some items from the menu!
        </p>
      ) : (
        <>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item" style={{ width: "100%", maxWidth: 720 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div>
                    <strong style={{ fontSize: 16 }}>{item.name}</strong>
                    <div style={{ color: "#666", marginTop: 4 }}>
                      ₹{item.price} × {item.qty} ={" "}
                      <strong>₹{item.price * item.qty}</strong>
                    </div>
                  </div>
                </div>

                <div className="cart-controls" style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => removeFromCart(item)}>-</button>
                  <button onClick={() => addToCart(item)}>+</button>
                  <button
                    onClick={() => removeItemCompletely(item)}
                    style={{
                      backgroundColor: "transparent",
                      color: "#ff7043",
                      border: "1px solid #ff7043",
                      padding: "6px 8px",
                      borderRadius: 6,
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div style={{ width: "100%", maxWidth: 720, marginTop: 20, textAlign: "right" }}>
              <h3>Total: ₹{total}</h3>
              <div style={{ marginTop: 12 }}>
                <button onClick={clearCart} className="clear-btn" style={{ marginRight: 8 }}>
                  Clear Cart
                </button>
                <button
                  onClick={() => {
                    setTotal(total);
                    setView("payment"); // 👈 Go to Payment Page
                  }}
                  style={{ backgroundColor: "#ff7043", color: "white" }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
