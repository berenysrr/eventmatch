import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/CreateEvent";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

// Home Component (Öneri Sistemli)
function Home() {
  const [events, setEvents] = useState([]);
  
  // Filtreleme State'leri
  const [filterCity, setFilterCity] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Kullanıcının İlgi Alanları (Öneri İçin)
  const userInterests = JSON.parse(localStorage.getItem("userInterests")) || [];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:5230/api/Events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  };

  const handleJoin = async (eventId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first!");
      return;
    }
    try {
      await axios.post("http://localhost:5230/api/Events/join", {
        userId: parseInt(userId),
        eventId: eventId
      });
      alert("✅ Successfully joined the event!");
    } catch (error) {
      alert("⚠️ You might already be joined!");
    }
  };

  // 1. ÖNERİ SİSTEMİ MANTIĞI: Kullanıcının ilgi alanına uyanları bul
  const recommendedEvents = events.filter(event => 
    userInterests.some(interest => event.category.toLowerCase().includes(interest.toLowerCase()))
  );

  // 2. GENEL FİLTRELEME MANTIĞI
  const filteredEvents = events.filter(event => {
    return (
      event.city.toLowerCase().includes(filterCity.toLowerCase()) &&
      event.category.toLowerCase().includes(filterCategory.toLowerCase()) &&
      (filterDate === "" || event.eventDate.includes(filterDate))
    );
  });

  return (
    <div>
      {/* --- ÖNERİLER BÖLÜMÜ (Varsa Göster) --- */}
      {userInterests.length > 0 && recommendedEvents.length > 0 && (
        <div style={{background: "#f0f8ff", padding: "40px 20px", marginBottom: "20px", borderBottom:"1px solid #ddd"}}>
          <h2 style={{textAlign:"center", color:"#0056b3", margin:"0 0 20px 0"}}>
             Recommended for You 🌟
          </h2>
          <p style={{textAlign:"center", color:"#666"}}>Based on your interests: {userInterests.join(", ")}</p>
          
          <div className="event-container" style={{padding:"20px 0"}}>
            {recommendedEvents.map((event) => (
              <div key={event.id} className="event-card" style={{border:"2px solid #007bff"}}>
                 <div style={{position:"absolute", top:10, right:10, background:"#ff9800", color:"white", padding:"5px 10px", borderRadius:"15px", fontSize:"12px", fontWeight:"bold"}}>Recommended</div>
                 <img src={event.imageUrl || "https://via.placeholder.com/300x150"} alt={event.title} style={{width:"100%", height:"150px", objectFit:"cover", borderRadius:"10px 10px 0 0"}}/>
                 <div style={{padding:"15px"}}>
                    <h3>{event.title}</h3>
                    <p><strong>📍 {event.city}</strong></p>
                    <p>🏷️ {event.category}</p>
                    <button onClick={() => handleJoin(event.id)}>Join Event</button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <h1 style={{textAlign:"center", marginTop:"40px", color:"#2a5298"}}>All Upcoming Events 🚀</h1>

      {/* FİLTRELEME KUTULARI */}
      <div className="filter-container" style={{display:"flex", justifyContent:"center", gap:"10px", marginBottom:"30px", flexWrap:"wrap"}}>
        <input placeholder="City" value={filterCity} onChange={(e) => setFilterCity(e.target.value)} style={{padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>
        <input placeholder="Category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} style={{padding:"10px", borderRadius:"5px", border:"1px solid #ccc"}}/>
        <button onClick={() => {setFilterCity(""); setFilterCategory(""); setFilterDate("")}} style={{width:"auto", background:"#666"}}>Clear</button>
      </div>
      
      {/* TÜM ETKİNLİKLER LİSTESİ */}
      <div className="event-container">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.imageUrl || "https://via.placeholder.com/300x150"} alt={event.title} style={{width:"100%", height:"150px", objectFit:"cover", borderRadius:"10px 10px 0 0"}}/>
            <div style={{padding:"15px"}}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>📍 {event.city}</strong></p>
              <p>🏷️ {event.category}</p>
              <p>📅 {new Date(event.eventDate).toLocaleDateString()}</p>
              <button onClick={() => handleJoin(event.id)}>Join Event</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;