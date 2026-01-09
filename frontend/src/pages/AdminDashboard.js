import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  // Etkinlikleri Çek
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:5230/api/Events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));
  };

  // Etkinlik Silme Fonksiyonu
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5230/api/Events/${id}`);
        alert("Event deleted successfully! 🗑️");
        fetchEvents(); // Listeyi yenile
      } catch (error) {
        alert("Error deleting event.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{textAlign:"center", color:"#d9534f"}}>Admin Dashboard 🛡️</h1>
      <p style={{textAlign:"center", color:"#666"}}>Manage and Moderate Events</p>

      <div style={{marginTop: "30px"}}>
        {events.map((event) => (
          <div key={event.id} style={styles.adminCard}>
            <div>
              <h3 style={{margin:0}}>{event.title}</h3>
              <small>{new Date(event.eventDate).toLocaleDateString()} - {event.city}</small>
            </div>
            
            <button 
              onClick={() => handleDelete(event.id)}
              style={styles.deleteButton}>
              Delete 🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  adminCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    borderLeft: "5px solid #d9534f"
  },
  deleteButton: {
    background: "#d9534f",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    width: "auto",
    marginTop: 0
  }
};

export default AdminDashboard;