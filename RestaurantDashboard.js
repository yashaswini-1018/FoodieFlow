import React, { useState, useEffect } from "react";

function RestaurantDashboard({ user }) {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("restaurantMenus")) || {};
    if (saved[user]) {
      setMenuItems(saved[user]);
    }
  }, [user]);

  const saveMenu = (updatedMenu) => {
    const allMenus = JSON.parse(localStorage.getItem("restaurantMenus")) || {};
    allMenus[user] = updatedMenu;
    localStorage.setItem("restaurantMenus", JSON.stringify(allMenus));
    setMenuItems(updatedMenu);
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      alert("Please enter both name and price!");
      return;
    }
    const updated = [...menuItems, { id: Date.now(), ...newItem }];
    saveMenu(updated);
    setNewItem({ name: "", price: "" });
  };

  const deleteItem = (id) => {
    const updated = menuItems.filter((item) => item.id !== id);
    saveMenu(updated);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{user}'s Restaurant Dashboard 🍽️</h2>

      <form onSubmit={addItem} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>

      <h3>Current Menu</h3>
      {menuItems.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              margin: "10px auto",
              width: "250px",
              borderRadius: "8px",
              padding: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default RestaurantDashboard;
