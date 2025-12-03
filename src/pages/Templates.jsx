



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import TemplateOne from "../templates/TemplateOne";
// import TemplateTwo from "../templates/TemplateTwo";
// import './Templates.css'

// const Templates = () => {
//   const navigate = useNavigate();

//   const handleChooseTemplate = (templateName) => {
//     // Navigate to edit resume form with chosen template as param
//     navigate(`/edit-resume/${templateName}`);
//   };

//   // Sample preview data (just placeholders)
//   const demoResumeData = {
//     fullName: "John Doe",
//     designation: "Full Stack Developer",
//     email: "john.doe@example.com",
//     phone: "+91 9876543210",
//     location: "Chennai, India",
//     summary: "Creative and detail-oriented developer with 3+ years experience.",
//     skills: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"],
//     experiences: [
//       {
//         company: "TechWave Solutions",
//         role: "Frontend Developer",
//         duration: "2022 - Present",
//         responsibilities:
//           "Built responsive UIs and optimized performance using React and Redux.",
//       },
//     ],
//     education: [
//       {
//         degree: "B.Tech in Computer Science",
//         institution: "Anna University",
//         year: "2021",
//       },
//     ],
//   };

//   const templates = [
//     {
//       id: "TemplateOne",
//       name: "Template One",
//       description: "Classic & Professional",
//       badge: "Popular",
//       component: TemplateOne
//     },
//     {
//       id: "TemplateTwo",
//       name: "Template Two",
//       description: "Modern & Creative",
//       badge: "New",
//       component: TemplateTwo
//     }
//   ];

//   return (
//     <div className="templates-page">
//       <div className="templates-header">
//         <h1 className="templates-title">Choose Your Resume Template</h1>
//         <p className="templates-subtitle">
//           Select a professionally designed template that matches your style and industry
//         </p>
//       </div>

//       <div className="template-grid">
//         {templates.map((template) => (
//           <div className="template-card" key={template.id}>
//             <div className="template-badge">{template.badge}</div>
            
//             <div className="preview-wrapper">
//               <div className="preview">
//                 <template.component resumeData={demoResumeData} />
//               </div>
//               <div className="preview-overlay">
//                 <button
//                   className="preview-btn"
//                   onClick={() => handleChooseTemplate(template.id)}
//                 >
//                   Preview Full Template
//                 </button>
//               </div>
//             </div>

//             <div className="template-info">
//               <div className="template-details">
//                 <h3 className="template-name">{template.name}</h3>
//                 <p className="template-description">{template.description}</p>
//               </div>
//               <button
//                 className="choose-btn"
//                 onClick={() => handleChooseTemplate(template.id)}
//               >
//                 <span>Use This Template</span>
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                   <path d="M5 12h14M12 5l7 7-7 7"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Templates;
import React from "react";
import { useNavigate } from "react-router-dom";
import TemplateOne from "../templates/TemplateOne";
import TemplateTwo from "../templates/TemplateTwo";
import TemplateThree from "../templates/TemplateThree";   // ⬅️ ADD THIS
import "./Templates.css";

const Templates = () => {
  const navigate = useNavigate();

  const handleChooseTemplate = (templateName) => {
    navigate(`/edit-resume/${templateName}`);
  };

  // Sample preview data (just placeholders)
  const demoResumeData = {
    fullName: "John Doe",
    designation: "Full Stack Developer",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    location: "Chennai, India",
    summary: "Creative and detail-oriented developer with 3+ years experience.",
    skills: ["React", "Node.js", "MongoDB", "Express", "TailwindCSS"],
    experiences: [
      {
        company: "TechWave Solutions",
        role: "Frontend Developer",
        duration: "2022 - Present",
        responsibilities:
          "Built responsive UIs and optimized performance using React and Redux.",
      },
    ],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "Anna University",
        year: "2021",
      },
    ],
  };

  const templates = [
    {
      id: "TemplateOne",
      name: "Template One",
      description: "Classic & Professional",
      badge: "Popular",
      component: TemplateOne,
    },
    {
      id: "TemplateTwo",
      name: "Template Two",
      description: "Modern & Creative",
      badge: "New",
      component: TemplateTwo,
    },
    {
      id: "TemplateThree",                 // ⬅️ NEW ENTRY
      name: "Template Three",
      description: "Clean & Two-Column Layout",
      badge: "Trending",
      component: TemplateThree,
    },
  ];

  return (
    <div className="templates-page">
      <div className="templates-header">
        <h1 className="templates-title">Choose Your Resume Template</h1>
        <p className="templates-subtitle">
          Select a professionally designed template that matches your style and industry
        </p>
      </div>

      <div className="template-grid">
        {templates.map((template) => (
          <div className="template-card" key={template.id}>
            <div className="template-badge">{template.badge}</div>

            <div className="preview-wrapper">
              <div className="preview">
                <template.component resumeData={demoResumeData} />
              </div>
              <div className="preview-overlay">
                <button
                  className="preview-btn"
                  onClick={() => handleChooseTemplate(template.id)}
                >
                  Preview Full Template
                </button>
              </div>
            </div>

            <div className="template-info">
              <div className="template-details">
                <h3 className="template-name">{template.name}</h3>
                <p className="template-description">{template.description}</p>
              </div>
              <button
                className="choose-btn"
                onClick={() => handleChooseTemplate(template.id)}
              >
                <span>Use This Template</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
