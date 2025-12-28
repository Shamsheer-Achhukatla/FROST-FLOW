import { useState } from "react";
import axios from "axios";
import "../glass.css";
import BackButton from "../components/BackButton";

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post("https://frost-flow.onrender.com/auth/login", { email, password });

    // SAVE TOKEN
      localStorage.setItem("token", res.data.token);

    // SAVE USER BASIC INFO
      localStorage.setItem("user", JSON.stringify({
        name: email.split("@")[0],
        email: email,
        profileIcon: "default"
      }));

      alert("Login Successful!");
      window.location.href = "/dashboard";

    } catch {
      alert("Invalid credentials");
    }
  };


  return (
    <div className="page-center">
        <BackButton />
      <div className="glass-card">
        <h2 className="ice-logo">LOGIN ❄</h2>

        <input className="input-box" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />

        <input className="input-box" type="password" placeholder="Password"
          onChange={e => setPassword(e.target.value)} />

        <button className="action-button" onClick={loginUser}>Login</button>
      </div>
    </div>
  );
}
