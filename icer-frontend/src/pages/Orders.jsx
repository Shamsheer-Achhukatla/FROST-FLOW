import { useEffect, useState } from "react";
import API from "../api/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    API.get("/orders/")
      .then((res) => setOrders(res.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    await API.delete(`/orders/${id}`);
    fetchOrders();
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-cyan-300 mb-8">
        Orders ❄️
      </h2>

      {orders.map((order) => (
        <div key={order._id} className="ice-card p-6 mb-4">
          <h3 className="font-bold">
            Total: ₹ {order.total}
          </h3>
          <p>Date: {new Date(order.date).toLocaleString()}</p>

          <button
            className="frozen-btn mt-4"
            onClick={() => cancelOrder(order._id)}
          >
            Cancel Order
          </button>
        </div>
      ))}
    </div>
  );
}