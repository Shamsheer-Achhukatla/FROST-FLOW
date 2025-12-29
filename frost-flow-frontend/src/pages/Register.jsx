import { useState } from "react";
import API from "../api";

export default function Register(){
  const [form,setForm]=useState({name:"",email:"",password:""});

  const submit=async()=>{
    const res = await API.post("/auth/register",form);
    alert(res.data.message);
  }

  return(
    <div className="frost-card">
      <h2>Register</h2>
      <input className="frost-input" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input className="frost-input" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="frost-input" placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="frost-button" onClick={submit}>Submit</button>
    </div>
  );
}
