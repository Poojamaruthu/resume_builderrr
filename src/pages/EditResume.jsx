


import React, { useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

import ResumeForm from "../components/ResumeForm";
import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import TemplateThree from "../templates/TemplateThree";   // ⭐ ADDED
import { AuthContext } from "../context/AuthContext";
import AiChatSidebar from "../components/AiChatSidebar";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./EditResume.css";

const EditResume = () => {
  const { templateName } = useParams();
  const componentRef = useRef();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const [resumeData, setResumeData] = useState({
    fullName: "Your Name",
    designation: "Your Role",
    email: "youremail@example.com",
    phone: "9876543210",
    location: "India",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourprofile",
    portfolio: "https://yourportfolio.com",
    summary: "A passionate developer eager to build great things!",
    experiences: [
      {
        company: "ABC Pvt Ltd",
        role: "Frontend Developer",
        duration: "Jan 2023 - Present",
        responsibilities: "Developed responsive React web applications.",
      },
    ],
    projects: [
      {
        title: "Portfolio Website",
        description: "Built a personal portfolio using React and TailwindCSS.",
      },
    ],
    skills: ["React", "Node.js", "MongoDB"],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "XYZ University",
        year: "2024",
      },
    ],
    certifications: ["AWS Certified Cloud Practitioner"],
    languages: ["English", "Tamil", "Hindi"],
    interests: ["Coding", "UI Design", "Traveling"],
  });

  // 📌 DOWNLOAD AS PDF
  const handleDownloadPDF = async () => {
    const element = componentRef.current;
    if (!element) return alert("⚠️ Resume preview not found!");

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.fullName}_Resume.pdf`);
      setShowDownloadMenu(false);
    } catch (err) {
      console.error("PDF Error:", err);
      alert("❌ Failed to generate PDF");
    }
  };

  // 📌 DOWNLOAD AS WORD
  const handleDownloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: resumeData.fullName, bold: true, size: 32 }),
              ],
            }),
            new Paragraph(resumeData.designation),
            new Paragraph(" "),
            new Paragraph({ text: "Summary:", bold: true }),
            new Paragraph(resumeData.summary),
            new Paragraph(" "),
            new Paragraph({ text: "Experience:", bold: true }),
            ...resumeData.experiences.map(
              (exp) =>
                new Paragraph(
                  `${exp.role} at ${exp.company} (${exp.duration}) - ${exp.description}`
                )
            ),
            new Paragraph(" "),
            new Paragraph({ text: "Projects:", bold: true }),
            ...resumeData.projects.map(
              (p) => new Paragraph(`${p.title} - ${p.description}`)
            ),
            new Paragraph(" "),
            new Paragraph({ text: "Skills:", bold: true }),
            new Paragraph(resumeData.skills.join(", ")),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${resumeData.fullName}_Resume.docx`);
    setShowDownloadMenu(false);
  };

  // 📌 SAVE TO DATABASE
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await axios.post("http://localhost:5000/api/resume/save", {
        username: user?.username || user?.email,
        templateName,
        resumeData,
      });

      res.data.success
        ? alert("✅ Resume saved successfully!")
        : alert("⚠️ Failed to save resume!");
    } catch {
      alert("❌ Error saving resume");
    } finally {
      setIsSaving(false);
    }
  };

  // 📌 TEMPLATE RENDERER
  const renderTemplate = () => {
    switch (templateName) {
      case "TemplateOne":
        return <TemplateOne resumeData={resumeData} />;
      case "TemplateTwo":
        return <TemplateTwo resumeData={resumeData} />;
      case "TemplateThree": // ⭐ NEW CASE
        return <TemplateThree resumeData={resumeData} />;
      default:
        return <p>⚠ No template found for "{templateName}"</p>;
    }
  };

  return (
    <div className="edit-page">
      {/* ⭐ Top Action Bar */}
      <div className="action-bar">
        <button className="back-btn" onClick={() => navigate("/templates")}>
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Templates
        </button>

        <div className="action-buttons">
          {/* AI BUTTON */}
          <button className="ai-btn" onClick={() => setShowAI(true)}>
            <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            AI Assist
          </button>

          {/* SAVE BUTTON */}
          <button className="save-btn" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="spinner"></span>Saving...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <path d="M17 21v-8H7v8M7 3v5h8" />
                </svg>
                Save Resume
              </>
            )}
          </button>

          {/* DOWNLOAD BUTTON WITH DROPDOWN */}
          <div className="download-dropdown">
            <button className="download-main-btn" onClick={() => setShowDownloadMenu(!showDownloadMenu)}>
              <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download
              <svg width="14" height="14" style={{ marginLeft: 4 }} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {showDownloadMenu && (
              <div className="download-options">
                <button onClick={handleDownloadPDF}>Download as PDF</button>
                <button onClick={handleDownloadWord}>Download as Word</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ⭐ MAIN CONTENT */}
      <div className="edit-content">
        {/* LEFT — FORM */}
        <div className="form-section">
          <div className="section-header">
            <h2>Edit Your Resume</h2>
            <p className="section-subtitle">Fill in your details to create a professional resume</p>
          </div>
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>

        {/* RIGHT — LIVE PREVIEW */}
        <div className="preview-section">
          <div className="preview-header">
            <h3>Live Preview</h3>
            <p className="preview-subtitle">See your changes in real time</p>
            <div className="template-badge">{templateName}</div>
          </div>

          <div className="preview-wrapper">
            <div className="preview-container" ref={componentRef}>
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {showAI && <AiChatSidebar onClose={() => setShowAI(false)} />}
    </div>
  );
};

export default EditResume;
