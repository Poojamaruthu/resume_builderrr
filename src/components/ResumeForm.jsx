

















import React, { useState } from "react";
import "./ResumeForm.css";

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [step, setStep] = useState(1);

  const steps = [
    { number: 1, title: "Basic Information", icon: "👤" },
    { number: 2, title: "Professional Summary", icon: "📝" },
    { number: 3, title: "Skills", icon: "⚡" },
    { number: 4, title: "Education", icon: "🎓" },
    { number: 5, title: "Projects", icon: "💼" },
    { number: 6, title: "Certifications", icon: "🏆" },
    { number: 7, title: "Social Links", icon: "🔗" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const handleArrayChange = (field, value) => {
    setResumeData({
      ...resumeData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 7));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const currentStep = steps.find(s => s.number === step);

  return (
    <div className="resume-form">
      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(step / 7) * 100}%` }}
          ></div>
        </div>
        <div className="step-indicators">
          {steps.map((s) => (
            <div 
              key={s.number}
              className={`step-dot ${step >= s.number ? 'active' : ''} ${step === s.number ? 'current' : ''}`}
              onClick={() => setStep(s.number)}
            >
              <span className="step-number">{s.number}</span>
              <span className="step-tooltip">{s.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Header */}
      <div className="step-header">
        <span className="step-icon">{currentStep.icon}</span>
        <div className="step-info">
          <h3 className="step-title">{currentStep.title}</h3>
          <p className="step-counter">Step {step} of 7</p>
        </div>
      </div>

      {/* STEP 1: Basic Info */}
      {step === 1 && (
        <div className="form-step">
          <div className="form-group">
            <label>Full Name *</label>
            <input 
              name="fullName" 
              value={resumeData.fullName} 
              onChange={handleChange}
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label>Job Title / Designation *</label>
            <input 
              name="designation" 
              value={resumeData.designation} 
              onChange={handleChange}
              placeholder="Full Stack Developer"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input 
                type="email"
                name="email" 
                value={resumeData.email} 
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                name="phone" 
                value={resumeData.phone} 
                onChange={handleChange}
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              name="location" 
              value={resumeData.location} 
              onChange={handleChange}
              placeholder="Chennai, India"
            />
          </div>
        </div>
      )}

      {/* STEP 2: Summary */}
      {step === 2 && (
        <div className="form-step">
          <div className="form-group">
            <label>Professional Summary</label>
            <p className="field-hint">
              Write a brief overview of your professional background, key skills, and career goals (2-3 sentences)
            </p>
            <textarea
              name="summary"
              rows="6"
              value={resumeData.summary}
              onChange={handleChange}
              placeholder="Experienced Full Stack Developer with 5+ years in building scalable web applications using React, Node.js, and cloud technologies. Passionate about creating efficient, user-friendly solutions that drive business growth."
            />
            <span className="char-count">{resumeData.summary?.length || 0} / 500</span>
          </div>
        </div>
      )}

      {/* STEP 3: Skills */}
      {step === 3 && (
        <div className="form-step">
          <div className="form-group">
            <label>Technical Skills</label>
            <p className="field-hint">
              Enter your skills separated by commas (e.g., React, Node.js, Python)
            </p>
            <textarea
              rows="4"
              value={resumeData.skills.join(", ")}
              onChange={(e) => handleArrayChange("skills", e.target.value)}
              placeholder="React, Node.js, MongoDB, Express, TypeScript, AWS, Docker"
            />
            <div className="skill-tags">
              {resumeData.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Education */}
      {step === 4 && (
        <div className="form-step">
          <div className="form-group">
            <label>Education</label>
            <p className="field-hint">
              Format: Degree — Institution — Year (one per line)
            </p>
            <textarea
              placeholder="B.Tech in Computer Science — Anna University — 2024&#10;XII (Higher Secondary) — ABC School — 2020"
              value={resumeData.education?.map(
                (e) => `${e.degree} — ${e.institution} — ${e.year}`
              ).join("\n")}
              onChange={(e) => {
                const edu = e.target.value.split("\n").map((line) => {
                  const [degree, institution, year] = line.split("—").map((s) => s.trim());
                  return { degree, institution, year };
                });
                setResumeData({ ...resumeData, education: edu });
              }}
              rows="5"
            />
          </div>
        </div>
      )}

      {/* STEP 5: Projects */}
      {step === 5 && (
        <div className="form-step">
          <div className="form-group">
            <label>Projects</label>
            <p className="field-hint">
              Format: Project Title — Year — Description (one per line)
            </p>
            <textarea
              placeholder="E-commerce Platform — 2024 — Built a full-stack shopping app using MERN stack with payment integration&#10;Task Manager — 2023 — Created a productivity app with real-time updates using Socket.io"
              value={resumeData.projects
                ?.map((p) => `${p.title} — ${p.year} — ${p.description}`)
                .join("\n")}
              onChange={(e) => {
                const projects = e.target.value.split("\n").map((line) => {
                  const [title, year, description] = line.split("—").map((s) => s.trim());
                  return { title, year, description };
                });
                setResumeData({ ...resumeData, projects });
              }}
              rows="6"
            />
          </div>
        </div>
      )}

      {/* STEP 6: Certifications & Achievements */}
      {step === 6 && (
        <div className="form-step">
          <div className="form-group">
            <label>Certifications</label>
            <p className="field-hint">
              Enter your certifications separated by commas
            </p>
            <input
              type="text"
              value={resumeData.certifications?.map((c) => c.name).join(", ")}
              onChange={(e) =>
                setResumeData({
                  ...resumeData,
                  certifications: e.target.value
                    .split(",")
                    .map((c) => ({ name: c.trim() })),
                })
              }
              placeholder="AWS Certified Solutions Architect, Google Cloud Professional"
            />
          </div>

          <div className="form-group">
            <label>Achievements (Optional)</label>
            <p className="field-hint">
              Notable accomplishments or awards separated by commas
            </p>
            <input
              type="text"
              value={resumeData.achievements?.join(", ") || ""}
              onChange={(e) =>
                handleArrayChange("achievements", e.target.value)
              }
              placeholder="Winner of Hackathon 2024, Published research paper on AI"
            />
          </div>
        </div>
      )}

      {/* STEP 7: Links */}
      {step === 7 && (
        <div className="form-step">
          <div className="form-group">
            <label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn Profile
            </label>
            <input 
              name="linkedin" 
              value={resumeData.linkedin || ""} 
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="form-group">
            <label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              GitHub Profile
            </label>
            <input 
              name="github" 
              value={resumeData.github || ""} 
              onChange={handleChange}
              placeholder="https://github.com/yourusername"
            />
          </div>

          <div className="form-group">
            <label>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                <path d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"/>
              </svg>
              Portfolio Website
            </label>
            <input 
              name="portfolio" 
              value={resumeData.portfolio || ""} 
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="form-navigation">
        <button 
          className="nav-btn back-btn" 
          onClick={handleBack}
          disabled={step === 1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Previous
        </button>
        
        <button 
          className="nav-btn next-btn" 
          onClick={handleNext}
          disabled={step === 7}
        >
          {step === 7 ? 'Complete' : 'Next'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;