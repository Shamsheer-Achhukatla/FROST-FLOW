import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 ice-card p-8">
      <h2 className="text-2xl font-bold mb-6 text-cyan-300">Register</h2>

      <input
        className="w-full mb-4 p-2 rounded text-black"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 rounded text-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full mb-4 p-2 rounded text-black"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="frozen-btn w-full" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}