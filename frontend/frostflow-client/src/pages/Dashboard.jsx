import "../glass.css";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Dashboard() {

  return (
    <div className="page-center">
        <BackButton />s
      <h1 className="ice-title">Welcome to Frost & Flow Dashboard ❄</h1>
      <p className="sub-text">Choose where you want to go</p>

      <div className="grid-container">

        <Link to="/booking" className="grid-card">🛠 Book Service</Link>
        <Link to="/products" className="grid-card">🛒 Buy Products</Link>
        <Link to="/orders" className="grid-card">📦 My Orders</Link>
        <Link to="/profile" className="grid-card">👤 Profile</Link>
        <Link to="/cart" className="grid-card">🛍 Cart</Link>
        <Link to="/" className="grid-card">🏠 Back Home</Link>

      </div>
    </div>
  );
}
