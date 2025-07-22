import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
        <Link to="/" className="brand-logo">
          <img src={tmLogo} alt="Logo" />
          <span className="brand-text">JIRA</span>
        </Link>
        <Link to="/dashboard" onClick={handleDashboardClick} className="dashboard-link">
          Dashboard
        </Link>
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
          <Link className="btn login-btn" to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
