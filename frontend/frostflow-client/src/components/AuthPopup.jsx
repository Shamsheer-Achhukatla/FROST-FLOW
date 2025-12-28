import { useNavigate } from "react-router-dom";
import "../glass.css";

export default function AuthPopup({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="popup-bg">
      <div className="popup-card">
        <h2 className="ice-logo">❄ FROST & FLOW ❄</h2>

        <button onClick={() => { onClose(); navigate("/login"); }}>
          Login
        </button>

        <button onClick={() => { onClose(); navigate("/register"); }}>
          Register
        </button>

        <button onClick={onClose}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
