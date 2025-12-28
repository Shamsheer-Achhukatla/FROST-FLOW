// 🌍 LIVE BACKEND URL
const BASE_URL = "https://frost-flow.onrender.com";

// 📦 Send Order
export const sendOrderToServer = async (order) => {
  try {
    const res = await fetch(`${BASE_URL}/save-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    return await res.json();
  } catch (error) {
    console.log("❌ Order not sent:", error);
    alert("Backend connection issue while sending order!");
  }
};

// 🛠 Send Booking
export const sendBookingToServer = async (booking) => {
  try {
    const res = await fetch(`${BASE_URL}/save-booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });
    return await res.json();
  } catch (error) {
    console.log("❌ Booking not sent:", error);
    alert("Backend connection issue while booking!");
  }
};

export default BASE_URL;
