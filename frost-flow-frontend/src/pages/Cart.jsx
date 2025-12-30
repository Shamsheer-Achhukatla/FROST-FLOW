import { useEffect,useState } from "react";
import API from "../api.js";

export default function Cart(){
  const [cart,setCart]=useState([]);

  useEffect(()=>{ API.get("/cart").then(r=>setCart(r.data)) },[]);

  return(
    <div className="frost-card">
      <h2>Cart</h2>
      {cart.map(i=><p key={i._id}>{i.name} - ₹{i.price}</p>)}
    </div>
  );
}
