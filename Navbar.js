import React from "react";

function Navbar({ setView, cartCount, user, logout }) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((u) => u.name === user);

  return (
    <nav>
      <button onClick={() => setView("home")}>Home</button>
      <button onClick={() => setView("menu")}>Menu</button>
      <button onClick={() => setView("cart")}>Cart ({cartCount})</button>
      <button onClick={() => setView("feedback")}>Feedback</button>

      {currentUser && currentUser.type === "restaurant" && (
        <button onClick={() => setView("dashboard")}>Dashboard</button>
      )}

      {!user ? (
        <>
          <button onClick={() => setView("login")}>Login</button>
          <button onClick={() => setView("register")}>Register</button>
        </>
      ) : (
        <button onClick={logout}>Logout ({user})</button>
      )}
    </nav>
  );
}

export default Navbar;
