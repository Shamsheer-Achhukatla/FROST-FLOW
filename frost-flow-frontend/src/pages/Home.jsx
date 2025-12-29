import Navbar from "../components/Navbar";
import FrostButton from "../components/FrostButton";

export default function Home(){
  return(
    <div>
      <Navbar/>
      <div className="frost-card">
        <h1>❄ Frost & Flow</h1>
        <p>Premium AC Repair & Spare Parts</p>
        <FrostButton text="Explore Products" onClick={()=>window.location="/products"} />
      </div>
    </div>
  );
}
