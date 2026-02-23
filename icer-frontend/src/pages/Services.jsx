import { useState } from "react";
import API from "../api/api";
import { motion } from "framer-motion";

export default function Services() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    serviceType: "",
    preferredDate: "",
    issue: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    try {
      await API.post("/services/", {
        ...form,
        date: new Date()
      });

      alert("Service booked successfully ❄️");
      setForm({
        name: "",
        phone: "",
        address: "",
        serviceType: "",
        preferredDate: "",
        issue: ""
      });
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-cyan-300 mb-8">
        Book AC Service
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="ice-card p-8 max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="name"
          placeholder="Full Name"
          className="p-3 rounded text-black"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="p-3 rounded text-black"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Full Address"
          className="p-3 rounded text-black md:col-span-2"
          value={form.address}
          onChange={handleChange}
        />

        <select
          name="serviceType"
          className="p-3 rounded text-black"
          value={form.serviceType}
          onChange={handleChange}
        >
          <option value="">Select Service Type</option>
          <option value="Installation">Installation</option>
          <option value="Repair">Repair</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <input
          type="date"
          name="preferredDate"
          className="p-3 rounded text-black"
          value={form.preferredDate}
          onChange={handleChange}
        />

        <textarea
          name="issue"
          placeholder="Describe your issue"
          className="p-3 rounded text-black md:col-span-2"
          value={form.issue}
          onChange={handleChange}
        />

        <button
          className="frozen-btn md:col-span-2"
          onClick={handleBooking}
        >
          Confirm Booking
        </button>
      </motion.div>
    </div>
  );
}