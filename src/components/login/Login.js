import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Mock users (fallback if not registered)
  const mockUsers = [
    { email: "user1@example.com", password: "user123", role: "user" },
    { email: "assignee1@example.com", password: "assignee123", role: "assignee" },
    { email: "admin@example.com", password: "admin123", role: "admin" },
    { email: "rasika.shirude@gmail.com", password: "test123", role: "assignee" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = savedUsers.find(
      (u) => u.email === email && u.password === password
    ) || mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      localStorage.setItem("user", JSON.stringify(matchedUser));
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
