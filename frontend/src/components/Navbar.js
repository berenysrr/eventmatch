import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>EventMatch 🚀</h2>
      <div style={{display:"flex", gap:"10px"}}>
        <Link to="/">Home</Link>
        <Link to="/create-event">Create Event</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin" style={{color:"#ffcccc"}}>Admin</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;