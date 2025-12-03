import React from "react";
import "./TemplateThree.css";

const TemplateThree = ({ resumeData }) => {
  if (!resumeData) return null;

  return (
    <div className="pdf-wrapper">
      {/* HEADER */}
      <h1 className="pdf-name">{resumeData.fullName}</h1>
      <p className="pdf-contact">
        📞 {resumeData.phone} | ✉ {resumeData.email}
        {resumeData.linkedin && <> | 🔗 {resumeData.linkedin}</>}
        {resumeData.github && <> | 💻 {resumeData.github}</>}
      </p>

      <div className="section">
        <h2>EDUCATION</h2>
        {resumeData.education?.map((edu, i) => (
          <p key={i} className="line-item">
            <strong>{edu.institution}</strong> — {edu.degree} ({edu.year})
            {edu.description && <> | {edu.description}</>}
          </p>
        ))}
      </div>

      {resumeData.experiences?.length > 0 && (
        <div className="section">
          <h2>INTERNSHIP</h2>
          {resumeData.experiences.map((exp, i) => (
            <p key={i} className="line-item">
              <strong>{exp.company}</strong> — {exp.role} ({exp.duration})
              <br /> {exp.responsibilities}
            </p>
          ))}
        </div>
      )}

      {resumeData.projects?.length > 0 && (
        <div className="section">
          <h2>PROJECTS</h2>
          {resumeData.projects.map((proj, i) => (
            <p key={i} className="line-item">
              <strong>{proj.title}</strong> ({proj.year ?? ""})
              <br /> {proj.description}
            </p>
          ))}
        </div>
      )}

      {resumeData.certifications?.length > 0 && (
        <div className="section">
          <h2>CERTIFICATIONS</h2>
          <ul>
            {resumeData.certifications.map((c, i) => (
              <li key={i}>{c.name} {c.year && `(${c.year})`}</li>
            ))}
          </ul>
        </div>
      )}

      {resumeData.achievements?.length > 0 && (
        <div className="section">
          <h2>ACHIEVEMENTS</h2>
          <ul>
            {resumeData.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {resumeData.skills?.length > 0 && (
        <div className="section">
          <h2>SKILLS</h2>
          <p className="skills-line">{resumeData.skills.join(" | ")}</p>
        </div>
      )}
    </div>
  );
};

export default TemplateThree;
