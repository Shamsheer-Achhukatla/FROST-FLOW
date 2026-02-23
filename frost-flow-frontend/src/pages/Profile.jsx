import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

export default function Profile(){
  const [user,setUser]=useState(null);
  const [error,setError]=useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    API.get("/auth/me")
      .then(r=>setUser(r.data))
      .catch(()=>{
        setError("Session expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(()=>navigate("/login"),1500);
      });
  },[]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if(!user && !error){
    return (
      <div className="frost-card">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if(error){
    return (
      <div className="frost-card">
        <h2>{error}</h2>
      </div>
    );
  }

  return(
    <div className="frost-card">
      <h2>Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button className="frost-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}