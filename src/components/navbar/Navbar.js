import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tmLogo from "./tm.jpg";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleDashboardClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar-wrapper">
      <div className="navbar-section">
        <a href="/" className="brand-logo">
          <img src={tmLogo} alt="Logo" />
          <span className="brand-text">JIRA</span>
        </a>
        <a href="/dashboard" onClick={handleDashboardClick} className="dashboard-link">
          Dashboard
        </a>
      </div>

      <div className="navbar-actions">
        {/* 👇 Small screen toggled search */}
        <form className={`search-form ${showSearch ? "visible" : ""}`} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Tasks..."
            value={query}
            onChange={handleSearch}
          />
        </form>

        <button className="search-icon" onClick={() => setShowSearch(!showSearch)}>🔍</button>

        {isAuthenticated ? (
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <a className="btn login-btn" href="/login">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
