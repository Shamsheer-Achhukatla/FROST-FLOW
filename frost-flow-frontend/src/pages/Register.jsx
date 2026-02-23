import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";

export default function Register(){
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState("");
  const navigate = useNavigate();

  const submit = async () => {

    if(!form.name || !form.email || !form.password){
      setMessage("Please fill all fields");
      return;
    }

    try{
      setLoading(true);
      const res = await API.post("/auth/register",form);
      setMessage("Registration successful ✔");

      setTimeout(()=>{
        navigate("/login");
      },1500);

    }catch(err){
      setMessage(err.response?.data?.msg || "Registration failed");
    }finally{
      setLoading(false);
    }
  }

  return(
    <div className="frost-card">
      <h2>Register</h2>

      {message && <p>{message}</p>}

      <input
        className="frost-input"
        placeholder="Name"
        onChange={e=>setForm({...form,name:e.target.value})}
      />

      <input
        className="frost-input"
        placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}
      />

      <input
        className="frost-input"
        type="password"
        placeholder="Password"
        onChange={e=>setForm({...form,password:e.target.value})}
      />

      <button
        className="frost-button"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Submit"}
      </button>
    </div>
  );
}