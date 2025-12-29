import { useEffect,useState } from "react";
import API from "../api";

export default function Products(){
  const [data,setData]=useState([]);

  useEffect(()=>{
    API.get("/products").then(res=>setData(res.data));
  },[]);

  return(
    <div className="frost-card">
      <h2>Products</h2>
      {data.map(p=>(
        <div key={p._id} className="frost-card">
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>
          <button className="frost-button">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

