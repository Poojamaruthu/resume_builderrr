








import React from "react";
import "./TemplateOne.css";

const TemplateOne = ({ resumeData }) => {
  if (!resumeData) return null;

  return (
    <div className="page-wrap" role="document" aria-label="Resume Template One">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1 id="fullName">{resumeData.fullName}</h1>
          <div className="designation">{resumeData.designation}</div>

          <div className="contact-list" aria-label="Contact information">
            {resumeData.email && (
              <div className="contact-item">
                <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
              </div>
            )}
            {resumeData.phone && (
              <div className="contact-item">
                <a href={`tel:${resumeData.phone}`}>{resumeData.phone}</a>
              </div>
            )}
            {resumeData.location && (
              <div className="contact-item">
                <span>{resumeData.location}</span>
              </div>
            )}
          </div>
        </div>

        <div className="header-right">
          {resumeData.linkedin && (
            <div>
              <strong>LinkedIn:</strong>{" "}
              <a
                href={`https://${resumeData.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                {resumeData.linkedin}
              </a>
            </div>
          )}
          {resumeData.github && (
            <div>
              <strong>GitHub:</strong>{" "}
              <a
                href={`https://${resumeData.github}`}
                target="_blank"
                rel="noreferrer"
              >
                {resumeData.github}
              </a>
            </div>
          )}
          {resumeData.portfolio && (
            <div>
              <strong>Portfolio:</strong>{" "}
              <a
                href={`https://${resumeData.portfolio}`}
                target="_blank"
                rel="noreferrer"
              >
                {resumeData.portfolio}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {resumeData.summary && (
        <section className="section">
          <div className="section-title">
            <h2>Professional Summary</h2>
            <div className="line"></div>
          </div>
          <p className="small">{resumeData.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {resumeData.experiences?.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>Work Experience</h2>
            <div className="line"></div>
          </div>

          {resumeData.experiences.map((exp, index) => (
            <div key={index} className="item">
              <div className="heading">
                <h3>
                  {exp.company} — {exp.role}
                </h3>
                <div className="duration muted">{exp.duration}</div>
              </div>
              <p>{exp.responsibilities}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resumeData.projects?.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>Projects</h2>
            <div className="line"></div>
          </div>

          {resumeData.projects.map((proj, index) => (
            <div key={index} className="item">
              <div className="heading">
                <h3>{proj.title}</h3>
                <div className="duration muted">{proj.year}</div>
              </div>
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

      {/* Skills */}
      {resumeData.skills?.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>Skills</h2>
            <div className="line"></div>
          </div>
          <ul className="skills-list">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {resumeData.education?.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>Education</h2>
            <div className="line"></div>
          </div>

          {resumeData.education.map((edu, index) => (
            <div key={index} className="item">
              <div className="heading">
                <h3>
                  {edu.degree} — {edu.institution}
                </h3>
                <div className="duration muted">{edu.year}</div>
              </div>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {resumeData.certifications?.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>Certifications</h2>
            <div className="line"></div>
          </div>
          <ul className="skills-list">
            {resumeData.certifications.map((cert, index) => (
              <li key={index}>
                {cert.name} {cert.year && `(${cert.year})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {resumeData.languages?.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>Languages</h2>
            <div className="line"></div>
          </div>
          <ul className="skills-list">
            {resumeData.languages.map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Interests */}
      {resumeData.interests?.length > 0 && (
        <section className="section">
          <div className="section-title">
            <h2>Interests</h2>
            <div className="line"></div>
          </div>
          <ul className="skills-list">
            {resumeData.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default TemplateOne;
