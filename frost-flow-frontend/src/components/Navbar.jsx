import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <nav
      style={{
        display:'flex',
        gap:'20px',
        padding:'20px',
        backdropFilter:'blur(12px)',
        animation: "slideDown 1s ease forwards"
      }}
    >
     
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/booking">Booking</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}
