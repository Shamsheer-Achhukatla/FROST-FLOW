import { Link } from "react-router-dom";
import "../glass.css";
import BackButton from "../components/BackButton";

export default function Home(){
  return (
    <div style={{textAlign:"center", padding:"40px"}}>
        <BackButton />
      
      <h1 className="ice-logo">❄ FROST & FLOW ❄</h1>
      <p style={{opacity:0.8}}>Your AC Service & Parts Hub</p>

      <div className="home-grid">
        <Link className="nav-btn" to="/products" >🛍 Top Products</Link>
        <Link className="nav-btn" to="/booking" >🛠 Book a Service</Link>
        <Link className="nav-btn" to="/orders" >📦 Track Orders</Link>
      </div>

      <div className="product-grid">
        <div className="product-card-mini">
          <h4>AC Gas Kit</h4><p>₹1200</p>
          <Link to="/products" className="mini-btn">View</Link>
        </div>
        <div className="product-card-mini">
          <h4>Coil Cleaner</h4><p>₹450</p>
          <Link to="/products" className="mini-btn">View</Link>
        </div>
        <div className="product-card-mini">
          <h4>Tools Kit</h4><p>₹850</p>
          <Link to="/products" className="mini-btn">View</Link>
        </div>
      </div>

    </div>
  );
}
