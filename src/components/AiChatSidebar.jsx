




import React, { useState } from "react";
import axios from "axios";
import "./AiChatSidebar.css";

const AiChatSidebar = ({ onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("https://resume-builderr-1.onrender.com/api/ai/ask", {
        prompt,
      });

      if (res.data.success) {
        setResponse(res.data.answer);
      } else {
        setResponse("⚠️ Failed to get response from AI.");
      }
    } catch (error) {
      console.error("AI Error:", error);
      setResponse("❌ Error contacting AI server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    alert("✅ Copied to clipboard!");
  };

  return (
    <div className="ai-sidebar-overlay" onClick={onClose}>
      <div className="ai-sidebar" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-sidebar-header">
          <div className="ai-header-content">
            <div className="ai-icon">
              <span>✨</span>
            </div>
            <div className="ai-title-section">
              <h3>AI Assistant</h3>
              <p className="ai-subtitle">Powered by AI</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="ai-body">
          {/* Prompt Input */}
          <div className="input-section">
            <label className="input-label">What can I help you with?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me to improve your resume summary, suggest skills, write a cover letter..."
            />
          </div>

          {/* Ask Button */}
          <button className="ask-btn" onClick={handleAskAI} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Thinking...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Ask AI
              </>
            )}
          </button>

          {/* Response Section */}
          {response && (
            <div className="ai-response">
              <div className="ai-response-header">
                <h4>
                  <span className="response-icon">✨</span>
                  AI Response
                </h4>
                <button className="copy-btn" onClick={handleCopy}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="ai-response-content">
                {response.split("\n").map((line, i) => (
                  <p key={i}>{line || "\u00A0"}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiChatSidebar;