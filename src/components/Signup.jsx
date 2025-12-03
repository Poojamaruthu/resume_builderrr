

// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "./Auth.css";

// const Signup = ({ onClose, switchToLogin }) => {
//   const { login } = useContext(AuthContext);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await fetch("http://localhost:5000/api/users/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username: name, email, password }),
//     });
//     const data = await res.json();
//     if (res.ok) {
//       login(data); // from AuthContext
//       onClose();
//     } else {
//       alert(data.message);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };


//   return (
//     <div className="popup-overlay">
//       <div className="popup-box">
//         <span className="close-btn" onClick={onClose}>
//           ✕
//         </span>
//         <h2>Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Signup</button>
//         </form>
//         <p className="auth-switch">
//           Already have an account?{" "}
//           <span onClick={switchToLogin}>Login</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;













import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";
import axios from "axios";

const Signup = ({ onClose = null, switchToLogin = null }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://resume-builderr-1.onrender.com/api/users/register", {
        username,
        email,
        password,
      });

      // Save user and log them in automatically
      localStorage.setItem("resumeUser", JSON.stringify(res.data));
      login(res.data);

      // ✅ Close popup (if exists)
      if (typeof onClose === "function") onClose();

      // ✅ Navigate to profile
      navigate("/profile");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed. Try again!");
    }
  };

  const handleSwitch = () => {
    if (typeof onClose === "function") onClose();
    if (typeof switchToLogin === "function") switchToLogin();
    else navigate("/login"); // ✅ fallback for route mode
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <span
          className="close-btn"
          onClick={() => {
            if (typeof onClose === "function") onClose();
            else navigate("/"); // fallback if opened as route
          }}
        >
          ✕
        </span>

        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={handleSwitch}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
