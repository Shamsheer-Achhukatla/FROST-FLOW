import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/orders");
      setOrders(res.data || []);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="frost-card">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="frost-card">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="frost-card">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((o) => (
          <div key={o._id} className="order-item">
            <p><strong>Order ID:</strong> {o._id}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${o.status}`}>
                {o.status}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}