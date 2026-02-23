import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // simulate quick validation (future: verify with backend)
    if (token) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }

    setLoading(false);
  }, []);

  if (loading) return null; // prevents UI flicker

  if (!authorized) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // return back after login
      />
    );
  }

  return children;
}