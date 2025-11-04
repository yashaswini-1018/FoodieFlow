import React from "react";

function Menu({ addToCart }) {
  const menuItems = [
    { id: 1, name: "Dosa", price: 80, img: "/images/dosa.jpg" },
    { id: 2, name: "Biryani", price: 350, img: "/images/biryani.jpg" },
    { id: 3, name: "Brownie", price: 200, img: "/images/brownie.jpg" },
    { id: 4, name: "Veg Burger", price: 150, img: "/images/burger.jpg" },
    { id: 5, name: "Chicken Fried Rice", price: 150, img: "/images/friedrice.jpg" },
    { id: 6, name: "Fries", price: 90, img: "/images/fries.jpg" },
    { id: 7, name: "Ice Cream", price: 100, img: "/images/icecream.jpg" },
    { id: 8, name: "Mutton Curry", price: 340, img: "/images/mutton.jpg" },
    { id: 9, name: "Pani Puri", price: 50, img: "/images/pani-puri.jpg" },
    { id: 10, name: "Pasta", price: 120, img: "/images/pasta.jpg" },
    { id: 11, name: "Pizza", price: 200, img: "/images/pizza.jpg" },
    { id: 12, name: "Shawarma", price: 90, img: "/images/shawarma.jpg" },
  ];

  return (
    <div className="menu-container">
      <h2>🍽️ Explore Our Delicious Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.img} alt={item.name} className="menu-img" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
