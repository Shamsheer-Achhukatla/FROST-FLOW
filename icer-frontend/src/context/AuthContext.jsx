import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("icer_token");
    const email = localStorage.getItem("icer_email");

    if (token) {
      setUser({ token, email });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("icer_token", token);
    localStorage.setItem("icer_email", "User");
    setUser({ token, email: "User" });
  };

  const logout = () => {
    localStorage.removeItem("icer_token");
    localStorage.removeItem("icer_email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}