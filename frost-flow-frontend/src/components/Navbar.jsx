import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navStyle = {
    display: "flex",
    gap: "22px",
    padding: "16px 28px",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    background: "rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    flexWrap: "wrap",
    animation: "slideDown 0.6s ease forwards"
  };

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#00eaff" : "white",
    fontWeight: 500,
    letterSpacing: "0.5px",
    transition: "0.3s ease",
    position: "relative"
  });

  return (
    <nav style={navStyle}>
      <Link style={linkStyle("/")} to="/">Home</Link>
      <Link style={linkStyle("/products")} to="/products">Products</Link>
      <Link style={linkStyle("/booking")} to="/booking">Booking</Link>
      <Link style={linkStyle("/cart")} to="/cart">Cart</Link>
      <Link style={linkStyle("/orders")} to="/orders">Orders</Link>
      <Link style={linkStyle("/profile")} to="/profile">Profile</Link>
    </nav>
  );
}