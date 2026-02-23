import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await API.get("/cart");
      setCart(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="frost-card">Loading cart...</div>;
  if (error) return <div className="frost-card">{error}</div>;

  return (
    <div className="frost-card">
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        cart.map((item, index) => (
          <p key={item._id || index}>
            {item.name} — ₹{Number(item.price).toLocaleString("en-IN")}
          </p>
        ))
      )}
    </div>
  );
}