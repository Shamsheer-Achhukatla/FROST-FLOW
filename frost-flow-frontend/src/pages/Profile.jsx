import {useEffect,useState} from "react";
import API from "../api.js";
export default function Profile(){
  const [user,setUser]=useState({});
  useEffect(()=>{API.get("/auth/me").then(r=>setUser(r.data))},[]);
  return(
    <div className="frost-card">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button className="frost-button" onClick={()=>{localStorage.removeItem("token");window.location="/"}}>Logout</button>
    </div>
  );
}
