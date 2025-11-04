import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import RestaurantDashboard from "./components/RestaurantDashboard";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccess from "./components/PaymentSuccess";

import "./App.css";

function App() {
  // ✅ Fix: Define 'user' before using it
  const [user, setUser] = useState(localStorage.getItem("loggedInUser") || null);
  const [view, setView] = useState(user ? "home" : "login");
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ Add to Cart (merge by ID, increment qty)
  const addToCart = (item) => {
    const price = Number(item.price) || 0;
    setCartItems((prev) => {
      const exist = prev.find((x) => x.id === item.id);
      if (exist) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        return [...prev, { ...item, price, qty: 1 }];
      }
    });
  };

  // ✅ Remove 1 quantity or remove item if qty = 0
  const removeFromCart = (item) => {
    setCartItems((prev) => {
      const exist = prev.find((x) => x.id === item.id);
      if (!exist) return prev;
      if (exist.qty === 1) {
        return prev.filter((x) => x.id !== item.id);
      } else {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
    });
  };

  // ✅ Remove item completely
  const removeItemCompletely = (item) => {
    setCartItems((prev) => prev.filter((x) => x.id !== item.id));
  };

  // ✅ Clear full cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Logout with confirmation
  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("loggedInUser");
      setUser(null);
      alert("Logged out successfully!");
      setView("login");
    }
  };

  return (
    <div className="App">
      {user ? (
        <>
          <Header />
          <Navbar
            setView={setView}
            cartCount={cartItems.reduce((s, c) => s + c.qty, 0)}
            user={user}
            logout={logout}
          />

          {view === "home" && (
            <div className="home">
              <h1>Welcome to FoodieFlow</h1>
              <p>Hi, {user}! Explore menus and order your favorite dishes 🍽️</p>
            </div>
          )}

          {view === "menu" && <Menu addToCart={addToCart} setView={setView} />}

          {view === "cart" && (
            <Cart
              cartItems={cartItems}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              removeItemCompletely={removeItemCompletely}
              clearCart={clearCart}
              setOrderPlaced={setOrderPlaced}
              setView={setView}
              setTotal={setTotal}
            />
          )}

          {view === "payment" && (
            <PaymentPage
              total={cartItems.reduce(
                (sum, it) => sum + Number(it.price) * it.qty,
                0
              )}
              clearCart={clearCart}
              setView={setView}
            />
          )}

          {view === "paymentSuccess" && <PaymentSuccess setView={setView} />}
          {view === "feedback" && <Feedback />}
          {view === "dashboard" && <RestaurantDashboard user={user} />}

          <Footer />
        </>
      ) : (
        <>
          {view === "login" && <Login setUser={setUser} setView={setView} />}
          {view === "register" && <Register setView={setView} />}
        </>
      )}
    </div>
  );
}

export default App;
