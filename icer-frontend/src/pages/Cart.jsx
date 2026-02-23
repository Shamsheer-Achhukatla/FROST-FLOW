import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    try {
      await API.post("/orders/", {
        items: cart,
        total: total,
        date: new Date()
      });

      alert("Order placed successfully ❄️");
      navigate("/orders");
    } catch (err) {
      console.log(err);
      alert("Checkout failed");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-300 mb-6">Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item, index) => (
        <div key={index} className="ice-card p-4 mb-4 flex justify-between">
          <div>
            <h3 className="font-bold">{item.name}</h3>
            <p>₹ {item.price}</p>
          </div>
          <button
            className="frozen-btn"
            onClick={() => removeFromCart(index)}
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Total: ₹ {total}</h3>
          <button
            className="frozen-btn mt-4"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}