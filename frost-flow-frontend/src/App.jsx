import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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


// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="fade-in">
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking/></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={
          <div className="frost-card">
            <h2>404 ❄ Page Frozen</h2>
            <p>The page you’re looking for doesn’t exist.</p>
          </div>
        } />

      </Routes>
    </div>
  );
}

export default function App(){

  // run snow animation once
  useEffect(() => {
    spawnIceParticles();
  }, []);

  return (
    <>
      {/* ❄ animated snow background */}
      <div className="snow"></div>

      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}