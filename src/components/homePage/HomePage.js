import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ searchQuery }) => {
  const navigate = useNavigate();

  // ✅ Auto-redirect if search query is present
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      navigate("/dashboard");
    }
  }, [searchQuery, navigate]);

  return (
    <div>
      {/*Welcome Section for Non-Logged-In Users*/}
      <section className="welcome">
        <div className="container">
          <h1>Welcome to TaskManager</h1>
          <p>
            Your ultimate solution for managing tasks efficiently and
            collaboratively.
          </p>
          <div className="cta-buttons">
            <a href="/login" className="btn primary">
              Login
            </a>
            <a href="/register" className="btn secondary">
              Sign Up
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <h2>Features</h2>
          <div className="feature-cards">
            <div className="card">
              <i className="fas fa-tasks card-icon"></i>
              <h3>Organize Tasks</h3>
              <p>
                Efficiently organize and prioritize your tasks for better
                productivity.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-users card-icon"></i>
              <h3>Team Collaboration</h3>
              <p>
                Collaborate seamlessly with your team to achieve common goals.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-chart-line card-icon"></i>
              <h3>Track Progress</h3>
              <p>
                Monitor task progress and stay updated with real-time tracking.
              </p>
            </div>
            <div className="card">
              <i className="fas fa-file-alt card-icon"></i>
              <h3>Detailed Reports</h3>
              <p>
                Generate comprehensive reports to analyze and improve
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="container">
          <h2>About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                TaskManager is designed to help individuals and teams stay organized and productive.
              </p>
              <p>
                Our mission is to simplify task management through intuitive tools and features that enable seamless collaboration and improved efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
