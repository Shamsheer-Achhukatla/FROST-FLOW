import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Products(){
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [addingId,setAddingId]=useState(null);
  const [message,setMessage]=useState("");

  useEffect(()=>{
    API.get("/products")
      .then(res=>setData(res.data))
      .catch(()=>setMessage("Failed to load products"))
      .finally(()=>setLoading(false));
  },[]);

  const addToCart = async(product)=>{
    try{
      setAddingId(product._id);
      await API.post("/products/cart/add", product);
      setMessage("Added to cart ✔");
      setTimeout(()=>setMessage(""),2000);
    }catch{
      setMessage("Failed to add item");
    }finally{
      setAddingId(null);
    }
  }

  if(loading) return (
    <div className="frost-card">
      <h2>Loading products...</h2>
    </div>
  );

  return(
    <div className="frost-card">
      <h2>Products</h2>

      {message && <p>{message}</p>}

      <div className="products-grid">
        {data.map(p=>(
          <div key={p._id} className="frost-card">
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button
              className="frost-button"
              disabled={addingId===p._id}
              onClick={() => addToCart(p)}
            >
              {addingId===p._id ? "Adding..." : "Add to Cart"}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}