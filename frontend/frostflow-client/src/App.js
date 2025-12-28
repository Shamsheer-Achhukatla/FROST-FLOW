import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";      // ⭐ ADD
import Profile from "./pages/Profile";  
import Cart from "./pages/Cart";
import { FaUser, FaShoppingCart, FaHome, FaTools, FaBoxOpen, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import ProtectedRoute from "./components/ProtectedRoute";  

import "./index.css";
import "./glass.css";
import "./cursor.js";

function App() {
  
 const user = JSON.parse(localStorage.getItem("user")); // ⭐ FIX HERE

  return (
    <BrowserRouter>
      <header style={styles.navbar}>
        <h2 className="ice-logo">❄ FROST & FLOW ❄</h2>
        <nav style={styles.navLinks}>
          <Link className="nav-btn" to="/"><FaHome /> Home</Link>
          <Link className="nav-btn" to="/booking"><FaTools /> Book Service</Link>
          <Link className="nav-btn" to="/products"><FaShoppingCart /> Shop</Link>
          <Link className="nav-btn" to="/orders"><FaBoxOpen /> Orders</Link>
          <Link className="nav-btn" to="/profile"><FaUserCircle size={35}/> Profile</Link>
          <Link className="nav-btn" to="/login"><FaSignInAlt /> Login</Link>
          <Link className="nav-btn" to="/register"><FaUserPlus /> Register</Link>
        </nav>

        {/* RIGHT SIDE USER DISPLAY */}
        

        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {user ? (
            <>
              <span style={{color:"#00eaff"}}>👤 {user.name}</span>
              <Link to="/profile">🔧 Profile</Link>
            </>
          ) : (
            <Link to="/login" style={{color:"#00eaff"}}>Login</Link>
          )}
        </div>

      </header>




      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        

      </Routes>
      <footer style={{
  marginTop:"40px",
  padding:"15px",
  textAlign:"center",
  background:"rgba(0,0,0,0.3)",
  backdropFilter:"blur(8px)",
  color:"#aeefff"
}}>
  ❄ Frost & Flow | AC Service & Spare Parts | All Rights Reserved
</footer>

    </BrowserRouter>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 25px",
    background: "rgba(0, 35, 65, 0.45)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 10
  },

  navLinks: {
    display: "flex",
    gap: "20px",
    fontWeight: "bold"
  }
};

export default App;
