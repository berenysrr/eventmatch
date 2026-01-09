import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5230/api/Auth/login", {
        email: email,
        password: password
      });

      // BU KISIM ÇOK ÖNEMLİ: ID'yi tarayıcı hafızasına kaydediyoruz
      localStorage.setItem("userId", response.data.userId); 
      localStorage.setItem("userName", response.data.user);

      alert("Login Successful! Welcome: " + response.data.user);
      navigate("/"); 
    } catch (error) {
      alert("Error: Invalid email or password!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login 🔐</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", marginTop: "50px" },
  card: { padding: "30px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "300px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }
};

export default Login;