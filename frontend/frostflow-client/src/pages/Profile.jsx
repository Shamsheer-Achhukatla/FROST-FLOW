import "../glass.css";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function Profile(){
  const user = JSON.parse(localStorage.getItem("user"));
   if(!user){
    return <h2 style={{textAlign:"center"}}>Please login first ❗</h2>;
  }

  return (
    <div className="page-center">
        <BackButton />
      <div className="glass-card" style={{width:"350px"}}>
       <FaUserCircle size={80} color="#00eaff" style={{marginBottom:"10px"}} />
       <h2 className="ice-logo">{user.name || "User"}</h2>
        <p><b>Email:</b> {user.email}</p>
        

        <div style={{marginTop:"20px"}}>
          <Link className="action-button" to="/cart">🛍 View Cart</Link>
          <Link className="action-button" to="/orders">📦 Order History</Link>
        </div>

        <button className="action-button" onClick={()=>{
          localStorage.clear();
          window.location.href = "/login";
        }}>Logout</button>
      </div>
    </div>
  );
}
