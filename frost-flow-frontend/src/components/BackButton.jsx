import { useNavigate } from "react-router-dom";

export default function BackButton(){
  const nav = useNavigate();
  return <button className="frost-btn" onClick={()=>nav(-1)}>⬅ Back</button>
}
