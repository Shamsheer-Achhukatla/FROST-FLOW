import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton(){
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(-1)}
      style={{
        background:"rgba(0,255,255,0.15)",
        backdropFilter:"blur(8px)",
        border:"1px solid #00eaff",
        color:"#00eaff",
        padding:"10px 16px",
        borderRadius:"20px",
        fontSize:"21px",
        display:"inline-flex",     // ⭐ FIX
        width:"fit-content",       // ⭐ FIX
        maxWidth:"100px",          // ⭐ WIDTH CONTROL
        alignItems:"center",
        gap:"9px",
        cursor:"pointer",
        marginBottom:"12px",
        whiteSpace:"nowrap"        // ⭐ no stretch / no wrap
      }}
    >
      <FaArrowLeft size={10}/> Back
    </button>
  );
}
