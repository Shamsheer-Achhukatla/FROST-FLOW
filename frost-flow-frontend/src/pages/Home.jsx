import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import FrostButton from "../components/FrostButton";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="page-container">
      <Navbar />

      <section className="frost-card center-card">
        <h1 className="brand-title">❄ Frost & Flow</h1>
        <p className="brand-subtitle">
          Premium AC Repair & Spare Parts
        </p>

        <FrostButton
          text="Explore Products"
          onClick={() => navigate("/products")}
        />
      </section>
    </main>
  );
}