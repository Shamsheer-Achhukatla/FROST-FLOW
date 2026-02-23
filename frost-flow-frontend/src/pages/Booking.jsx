import { useState } from "react";
import API from "../api/api.js";

export default function Booking() {
  const [acType, setAcType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const book = async () => {
    if (!acType.trim()) {
      setMessage("Please enter AC type");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await API.post("/service/book", { acType });

      setMessage("✅ Booking requested successfully!");
      setAcType("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="frost-card">
      <h2>Service Booking</h2>

      <input
        className="frost-input"
        placeholder="Enter AC Type (Split, Window...)"
        value={acType}
        onChange={(e) => setAcType(e.target.value)}
      />

      <button
        className="frost-button"
        onClick={book}
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Service"}
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}