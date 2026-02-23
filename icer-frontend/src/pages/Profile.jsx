import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

export default function Profile() {
  const { logout, user } = useContext(AuthContext);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    API.get("/orders/")
      .then((res) => setOrderCount(res.data.length))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="text-4xl font-bold text-cyan-300 mb-8">
        My Profile ❄️
      </h2>

      <div className="ice-card p-8 max-w-md space-y-4">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Total Orders:</strong> {orderCount}</p>

        <button className="frozen-btn w-full" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}