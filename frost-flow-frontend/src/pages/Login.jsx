import { useState } from "react";
import API from "../api";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const login=async()=>{
    const res = await API.post("/auth/login",{email,password});
    localStorage.setItem("token",res.data.token);
    window.location="/dashboard";
  }

  return(
    <div className="frost-card">
      <h2>Login</h2>
      <input className="frost-input" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input className="frost-input" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
      <button className="frost-button" onClick={login}>Login</button>
    </div>
  );
}
