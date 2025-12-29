import { useState } from "react";
import api from "../api/api";

export default function Register(){
  const [data,setData] = useState({name:"",email:"",password:""});
  const change = e => setData({...data,[e.target.name]:e.target.value});
  const save = async () => {
    const res = await api.post("/register",data);
    alert(res.data.message);
  };

  return (
    <div className="frost-card" style={{width:"40%",margin:"60px auto"}}>
      <h2>Register</h2>
      <input className="frost-input" name="name" placeholder="Name" onChange={change}/>
      <input className="frost-input" name="email" placeholder="Email" onChange={change}/>
      <input className="frost-input" name="password" placeholder="Password" type="password" onChange={change}/>
      <button className="frost-btn" onClick={save}>Register</button>
    </div>
  );
}
