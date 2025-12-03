import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleGetStarted = () => {
    if (user) {
      navigate("/templates");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="badge">✨ AI-Powered Resume Builder</div>
        <h1 className="home-title">
          Build a <span className="highlight">Professional Resume</span> in Minutes
        </h1>
        <p className="home-subtitle">
          Choose from expertly designed templates, customize your details, and generate your perfect resume effortlessly.
        </p>
        <button className="home-btn" onClick={handleGetStarted}>
          {user ? "Go to Templates" : "Get Started"}
          <span className="arrow">→</span>
        </button>
        <div className="stats">
          <div className="stat-item">
            <strong>10K+</strong>
            <span>Resumes Created</span>
          </div>
          <div className="stat-item">
            <strong>95%</strong>
            <span>Success Rate</span>
          </div>
          <div className="stat-item">
            <strong>24/7</strong>
            <span>Available</span>
          </div>
        </div>
      </div>

      <div className="home-animation-section">
        <div className="resume-mockup">
          <div className="mockup-header">
            <div className="mockup-avatar"></div>
            <div className="mockup-info">
              <div className="line line-name"></div>
              <div className="line line-title"></div>
            </div>
          </div>
          <div className="mockup-section">
            <div className="line line-heading"></div>
            <div className="line line-text"></div>
            <div className="line line-text"></div>
            <div className="line line-text short"></div>
          </div>
          <div className="mockup-section">
            <div className="line line-heading"></div>
            <div className="line line-text"></div>
            <div className="line line-text"></div>
          </div>
          <div className="mockup-section">
            <div className="line line-heading"></div>
            <div className="line line-text"></div>
            <div className="line line-text short"></div>
          </div>
        </div>
        <div className="floating-card card-1">
          <div className="card-icon">📄</div>
          <div className="card-text">Templates</div>
        </div>
        <div className="floating-card card-2">
          <div className="card-icon">✏️</div>
          <div className="card-text">Customize</div>
        </div>
        <div className="floating-card card-3">
          <div className="card-icon">⬇️</div>
          <div className="card-text">Download</div>
        </div>
      </div>
    </div>
  );
}

export default Home;