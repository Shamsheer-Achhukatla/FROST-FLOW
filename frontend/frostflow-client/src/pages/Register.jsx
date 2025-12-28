import { useState } from "react";
import axios from "axios";
import "../glass.css";
import BackButton from "../components/BackButton";

export default function Register(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const res = await axios.post(
        "https://frost-flow.onrender.com/auth/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );


      alert("Account Created! Please Login.");
      window.location.href = "/login";
    } catch {
      alert("Registration Failed. Check backend.");
    }
  };

  return (
    <div className="page-center">
        <BackButton />
      <div className="glass-card">
        <h2 className="ice-logo">REGISTER ❄</h2>

        <input className="input-box" placeholder="Full Name"
          onChange={e => setName(e.target.value)} />

        <input className="input-box" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input className="input-box" type="password" placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="action-button" onClick={registerUser}>Create Account</button>
      </div>
    </div>
  );
}
