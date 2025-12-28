export const sendOrderToServer = async (order) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/save-order", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(order)
    });
    return await res.json();
  } catch {
    console.log("Server not connected yet 👍");
  }
};

export const sendBookingToServer = async (booking) => {
  try {
    const res = await fetch("http://127.0.0.1:5000/save-booking", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(booking)
    });
    return await res.json();
  } catch {
    console.log("Backend not connected yet, but ready 💾");
  }
};
