import { useState } from "react";
import API from "../api/api.js";

export default function Booking(){
  const [acType,setAcType]=useState("");

  const book=async()=>{
    await API.post("/service/book",{acType});
    alert("Booking Requested!");
  }

  return(
    <div className="frost-card">
      <h2>Service Booking</h2>
      <input className="frost-input" placeholder="AC Type" onChange={e=>setAcType(e.target.value)}/>
      <button className="frost-button" onClick={book}>Book</button>
    </div>
  );
}
