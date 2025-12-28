import "../glass.css";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="page-center">
        <BackButton />
      <div className="glass-card" style={{width:"80%", padding:"25px"}}>
        <h2 className="ice-logo">📦 My Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet 😕</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <h3>{order.item}</h3>
              <p>Price: {order.price}</p>
              <p>Status: <span className="status">{order.status}</span></p>
              <p>Order Date: {order.date}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
