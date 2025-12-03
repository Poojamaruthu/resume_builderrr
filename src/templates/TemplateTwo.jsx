import React from "react";
import "./TemplateTwo.css";

const TemplateTwo = ({ resumeData }) => {
  if (!resumeData) return null;

  return (
    <div className="template-two">
      {/* Header */}
      <header className="header">
        <div className="name-section">
          <h1>{resumeData.fullName}</h1>
          <h3>{resumeData.designation}</h3>
        </div>

        <div className="contact-section">
          {resumeData.email && <p>📧 {resumeData.email}</p>}
          {resumeData.phone && <p>📞 {resumeData.phone}</p>}
          {resumeData.location && <p>📍 {resumeData.location}</p>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.summary && (
        <section className="summary">
          <h2>About Me</h2>
          <p>{resumeData.summary}</p>
        </section>
      )}

      <div className="main-content">
        {/* Left column */}
        <div className="left-col">
          {/* Skills */}
          {resumeData.skills?.length > 0 && (
            <section>
              <h2>Skills</h2>
              <ul>
                {resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
          {resumeData.education?.length > 0 && (
            <section>
              <h2>Education</h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="edu-item">
                  <strong>{edu.degree}</strong>
                  <p>{edu.institution}</p>
                  <span>{edu.year}</span>
                </div>
              ))}
            </section>
          )}

          {/* Languages */}
          {resumeData.languages?.length > 0 && (
            <section>
              <h2>Languages</h2>
              <ul>
                {resumeData.languages.map((lang, index) => (
                  <li key={index}>{lang}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="right-col">
          {/* Work Experience */}
          {resumeData.experiences?.length > 0 && (
            <section>
              <h2>Experience</h2>
              {resumeData.experiences.map((exp, index) => (
                <div key={index} className="exp-item">
                  <h3>{exp.role}</h3>
                  <h4>{exp.company}</h4>
                  <span className="duration">{exp.duration}</span>
                  <p>{exp.responsibilities}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {resumeData.projects?.length > 0 && (
            <section>
              <h2>Projects</h2>
              {resumeData.projects.map((proj, index) => (
                <div key={index} className="proj-item">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <div className="links">
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    )}
                    {proj.demoLink && (
                      <a href={proj.demoLink} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;
