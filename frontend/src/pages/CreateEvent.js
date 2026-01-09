import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventDate: "",
    city: "",
    category: "",
    imageUrl: "" // Yeni alan
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5230/api/Events", formData);
      alert("Event Created Successfully! 🚀");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating event.");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Create New Event 📅</h2>
        <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:"10px"}}>
          <input name="title" placeholder="Event Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          
          {/* Yeni Resim Linki Kutusu */}
          <input name="imageUrl" placeholder="Image URL (e.g. https://example.com/pic.jpg)" onChange={handleChange} />
          
          <div style={{textAlign: "left"}}>
            <label style={{fontSize: "12px", color: "#666"}}>Event Date:</label>
            <input name="eventDate" type="datetime-local" onChange={handleChange} required />
          </div>

          <input name="city" placeholder="City" onChange={handleChange} required />
          <input name="category" placeholder="Category (e.g. Music, Tech)" onChange={handleChange} required />
          
          <button type="submit">Create Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;