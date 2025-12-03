

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("resumeUser"));
  const username = loggedInUser?.username;

  // ✅ Fetch profile + user's resumes
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`https://resume-builderr-1.onrender.com/api/profile/${username}`);
      setUserData(res.data.user);
      setResumes(res.data.resumes || []);
      setUpdatedUser(res.data.user);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!username) {
      console.warn("⚠️ No logged-in user found");
      setLoading(false);
      return;
    }
    fetchProfile();
  }, [username]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // ✅ Save edited profile (then refresh data instantly)
  const handleSave = async () => {
    try {
      const updateData = {
        profile: updatedUser.profile,
        phone: updatedUser.phone,
        about: updatedUser.about,
      };

      await axios.put(`http://localhost:5000/api/profile/${username}`, updateData);

      setEditing(false);
      await fetchProfile(); // 🔁 instantly reload latest data
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile!");
    }
  };

  // ✅ Delete resume
  const handleDeleteResume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/resumes/${id}`);
      setResumes((prev) => prev.filter((r) => r._id !== id));
      alert("🗑️ Resume deleted successfully!");
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume!");
    }
  };

  // ✅ Edit resume by templateName
  const handleEditResume = (templateName) => {
    const safeName = encodeURIComponent(templateName.trim());
    navigate(`/edit-resume/${safeName}`);
  };

  if (loading) return <p className="loading">Loading your profile...</p>;
  if (!userData) return <p className="error">No user data found.</p>;

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>

      {/* 🧍 User Details */}
      <div className="profile-box">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>

        {editing ? (
          <>
            <input
              type="text"
              name="profile"
              placeholder="Profile Title (e.g., Software Engineer)"
              value={updatedUser.profile || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={updatedUser.phone || ""}
              onChange={handleChange}
            />
            <textarea
              name="about"
              placeholder="About yourself"
              rows="4"
              value={updatedUser.about || ""}
              onChange={handleChange}
            ></textarea>

            <button className="save-btn" onClick={handleSave}>💾 Save</button>
            <button className="cancel-btn" onClick={() => setEditing(false)}>❌ Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Profile:</strong> {userData.profile || "Not added"}</p>
            <p><strong>Phone:</strong> {userData.phone || "Not added"}</p>
            <p><strong>About:</strong> {userData.about || "Not added"}</p>

            <button className="edit-btn" onClick={() => setEditing(true)}>✏️ Edit Profile</button>
          </>
        )}
      </div>

      {/* 📄 User's Resumes */}
      <div className="resume-section">
        <h3>📄 Your Resumes</h3>
        {resumes.length === 0 ? (
          <p>No resumes created yet.</p>
        ) : (
          <ul className="resume-list">
            {resumes.map((resume) => (
              <li key={resume._id} className="resume-item">
                <div className="resume-info">
                  <span className="resume-title">{resume.title}</span>
                  <span className="resume-user">👤 {resume.username || username}</span>
                </div>
                <div className="resume-actions">
                  <button onClick={() => handleEditResume(resume.templateName)}>✏️ Edit</button>
                  <button onClick={() => handleDeleteResume(resume._id)}>🗑️ Delete</button>
                  {resume.fileUrl && (
                    <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                      📂 View
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
