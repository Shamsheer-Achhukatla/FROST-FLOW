import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="ice-card m-4 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-300">ICER ❄️</h1>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-cyan-300">Home</Link>
          <Link to="/products" className="hover:text-cyan-300">Products</Link>
          <Link to="/services" className="hover:text-cyan-300">Services</Link>
          <Link to="/orders" className="hover:text-cyan-300">Orders</Link>
          <Link to="/profile" className="hover:text-cyan-300">Profile</Link>
          <Link to="/login" className="hover:text-cyan-300">Login</Link>
          <Link to="/cart" className="hover:text-cyan-300">
          Cart
          </Link>
          <Link to="/register" className="hover:text-cyan-300">
          Signup
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 px-6 pb-10">
        {children}
      </div>
    </div>
  );
}