import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

export default function Dashboard() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    API.get("/auth/me")
      .then(res => setName(res.data.name))
      .catch(() => {});
  }, []);

  return (
    <div className="frost-card">
      <h2>
        Welcome {name ? `, ${name}` : ""} ❄
      </h2>

      <p>Your AC is in good hands.</p>

      <div style={{ marginTop: "20px", display: "grid", gap: "10px" }}>
        <button className="frost-button" onClick={() => navigate("/booking")}>
          Book Service
        </button>

        <button className="frost-button" onClick={() => navigate("/products")}>
          Browse Products
        </button>

        <button className="frost-button" onClick={() => navigate("/orders")}>
          View Orders
        </button>
      </div>

      <p style={{ marginTop: "15px", opacity: 0.7 }}>
        Stay cool. Stay comfortable.
      </p>
    </div>
  );
}