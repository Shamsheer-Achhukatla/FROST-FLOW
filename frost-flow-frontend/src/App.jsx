import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import ProtectedRoute from "./components/ProtectedRoute";
import { spawnIceParticles } from "./snow";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Booking from "./pages/Booking";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

export default function App(){

  // Run snow animation safely after UI loads
  useEffect(() => {
    spawnIceParticles();
  }, []);

  return (
    <>
      <div className="snow"></div> {/* ❄ animated snow background */}

      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><Booking/></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
