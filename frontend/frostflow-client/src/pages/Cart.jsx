import { useEffect, useState } from "react";
import "../glass.css";
import BackButton from "../components/BackButton"; // << IMPORTANT
import { sendOrderToServer } from "../utils/api";

export default function Cart(){

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  
  const user = JSON.parse(localStorage.getItem("user"));

  const placeOrder = async () => {
    if (!user) return alert("Login required first!");

    for (let item of cart) {
      await fetch("http://127.0.0.1:5000/save-order", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user: user.email,
          item: item.name,
          price: item.price,
          status: "Pending",
          date: new Date().toLocaleDateString()
        })
      });
    }

    localStorage.removeItem("cart");
    setCart([]);
    alert("Order sent to server 📦");
  };

  return (
    <div className="page-center">

      {/* BACK BUTTON HERE */}
      <BackButton />

      <div className="glass-card" style={{width:"80%", padding:"25px"}}>
        <h2 className="ice-logo">🛒 My Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty 😕</p>
        ) : (
          cart.map((item, i) => (
            <div key={i} className="order-item">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button className="action-button" onClick={() => removeItem(i)}>
                Remove
              </button>
              <hr />
            </div>
          ))
        )}

        {cart.length > 0 && (
          <button className="action-button" onClick={placeOrder}>
            CONFIRM ORDER 📦
          </button>
        )}
      </div>
    </div>
  );
}
