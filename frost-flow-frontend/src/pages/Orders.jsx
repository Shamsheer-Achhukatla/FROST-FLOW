import {useEffect,useState} from "react";
import API from "../api/api.js";
export default function Orders(){
  const [orders,setOrders]=useState([]);

  useEffect(()=>{API.get("/orders").then(r=>setOrders(r.data))},[]);

  return(
    <div className="frost-card">
      <h2>Your Orders</h2>
      {orders.map(o=><p key={o._id}>Order #{o._id} - {o.status}</p>)}
    </div>
  );
}
