import { useState } from "react";
import "../glass.css";
import BackButton from "../components/BackButton";

export default function Booking(){
  const [service, setService] = useState("");
  const [acType, setAcType] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");

  const user = JSON.parse(localStorage.getItem("user")); // ⭐ GET LOGGED USER

  const submitBooking = async () => {
    if(!service || !acType || !date || !address){
      return alert("Fill all fields ❗");
    }

    if(!user){
      return alert("Please login first ❗");
    }

    // ⭐ Save to backend MongoDB
    await fetch("https://frost-flow.onrender.com/save-booking", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({
        user: user.email,
        service, acType, date, address,
        status: "Scheduled"
      })
    });


    // ⭐ Save to LocalStorage (backup view)
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({service, acType, date, address, status:"Scheduled"});
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Service Booked Successfully! 🛠");
    window.location.href="/orders";
  };

  return (
    <div className="page-center">
      <BackButton />
      <div className="glass-card" style={{width:"350px"}}>
        <h2 className="ice-logo">🛠 Book AC Service</h2>

        <select className="input-box" onChange={e=>setService(e.target.value)}>
          <option>Select Service Type</option>
          <option>AC Repair</option>
          <option>Gas Filling</option>
          <option>Installation</option>
          <option>General Service</option>
        </select>

        <select className="input-box" onChange={e=>setAcType(e.target.value)}>
          <option>Select AC Type</option>
          <option>Split AC</option>
          <option>Window AC</option>
          <option>Inverter AC</option>
          <option>Central AC</option>
        </select>

        <input type="date" className="input-box" onChange={e=>setDate(e.target.value)} />
        <textarea className="input-box" placeholder="Address" onChange={e=>setAddress(e.target.value)} />

        <button className="action-button" onClick={submitBooking}>Confirm Booking</button>
      </div>
    </div>
  );
}
