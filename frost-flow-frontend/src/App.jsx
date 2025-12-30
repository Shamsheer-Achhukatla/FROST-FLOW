import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { spawnIceParticles } from "./snow";   // <-- PASTE HERE



import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Booking from "./pages/Booking";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

spawnIceParticles(); // <-- PASTE BELOW IMPORTS



export default function App(){
  return(
  <>
      <div className="snow"></div> {/* ❄ animated snow */}  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
        <Route path="/booking" element={<ProtectedRoute><Booking/></ProtectedRoute>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}
