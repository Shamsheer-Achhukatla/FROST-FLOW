import { useState } from "react";
import axios from "axios";
import "../glass.css";
import BackButton from "../components/BackButton";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
  try {
    const API = "https://frost-flow.onrender.com";
    await axios.post(`${API}/auth/login`, { email, password });

    console.log("SERVER RESPONSE:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      alert("Login Success");
      window.location.href = "/dashboard";

    } catch (error) {
      alert(error.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <div className="page-center">
      <BackButton />
      <div className="glass-card">
        <h2 className="ice-logo">LOGIN ❄</h2>

        <input className="input-box" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input className="input-box" placeholder="Password" type="password"
          onChange={e => setPassword(e.target.value)} />

        <button className="action-button" onClick={loginUser}>Login</button>
      </div>
    </div>
  );
}
