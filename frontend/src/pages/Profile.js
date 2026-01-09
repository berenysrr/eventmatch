import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [myEvents, setMyEvents] = useState([]);
  // Kullanıcının seçtiği ilgi alanlarını tutuyoruz
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  // Sabit ilgi alanı listesi (Etkinlik kategorileriyle aynı olmalı)
  const allInterests = ["Music", "Technology", "Art", "Travel", "Business", "Sports", "Education"];

  useEffect(() => {
    // 1. Tarayıcı hafızasından kayıtlı ilgi alanlarını geri getir
    const savedInterests = JSON.parse(localStorage.getItem("userInterests")) || [];
    setSelectedInterests(savedInterests);

    // 2. Katıldığı etkinlikleri getir
    if (userId) {
      axios.get(`http://localhost:5230/api/Events/my-events/${userId}`)
        .then((res) => setMyEvents(res.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);

  // İlgi alanına tıklayınca seç/kaldır yapan fonksiyon
  const toggleInterest = (interest) => {
    let newInterests;
    if (selectedInterests.includes(interest)) {
      newInterests = selectedInterests.filter(i => i !== interest); // Varsa çıkar
    } else {
      newInterests = [...selectedInterests, interest]; // Yoksa ekle
    }
    setSelectedInterests(newInterests);
    // Hafızaya kaydet (Ana sayfa buradan okuyacak)
    localStorage.setItem("userInterests", JSON.stringify(newInterests));
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px" }}>
      
      {/* Profil Başlığı */}
      <div className="profile-header">
        <h1 style={{margin:0}}>Welcome, {userName || "Guest"}! 👋</h1>
        <p style={{opacity:0.8}}>User ID: {userId}</p>
      </div>

      {/* --- İLGİ ALANLARI SEÇİMİ (My Interests) --- */}
      <div style={{marginBottom: "40px", textAlign:"center"}}>
        <h3 style={{color:"#444", marginBottom:"15px"}}>Select Your Interests ✨</h3>
        <p style={{fontSize:"14px", color:"#666", marginBottom:"20px"}}>Click to select topics you like for personalized recommendations!</p>
        
        <div style={{display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap"}}>
          {allInterests.map((tag, index) => {
            const isSelected = selectedInterests.includes(tag);
            return (
              <span 
                key={index} 
                onClick={() => toggleInterest(tag)}
                style={{
                  background: isSelected ? "linear-gradient(90deg, #667eea 0%, #764ba2 100%)" : "#e0e0e0",
                  color: isSelected ? "white" : "#555",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  border: isSelected ? "2px solid transparent" : "2px solid #ccc",
                  fontWeight: "bold"
                }}>
                {tag} {isSelected ? "✓" : "+"}
              </span>
            );
          })}
        </div>
      </div>

      {/* Katıldığı Etkinlikler */}
      <h2 style={{color:"#444", borderBottom:"2px solid #ddd", paddingBottom:"10px"}}>
        Your Joined Events 🎫
      </h2>
      
      <div className="event-container" style={{padding: "20px 0", justifyContent:"flex-start"}}>
        {myEvents.length === 0 ? (
          <p style={{color:"#888", fontSize:"18px"}}>You haven't joined any events yet.</p>
        ) : (
          myEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img 
                 src={event.imageUrl || "https://via.placeholder.com/300x150?text=Event+Image"} 
                 alt={event.title} 
                 style={{width:"100%", height:"150px", objectFit:"cover", borderRadius:"10px 10px 0 0"}}
               />
              <div style={{padding:"15px"}}>
                <h3>{event.title}</h3>
                <p><strong>📍 {event.city}</strong></p>
                <p>📅 {new Date(event.eventDate).toLocaleDateString()}</p>
                <div style={{background:"#eef", color:"#55f", padding:"5px", borderRadius:"5px", textAlign:"center", marginTop:"10px", fontSize:"12px", fontWeight:"bold"}}>
                  Joined ✅
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;