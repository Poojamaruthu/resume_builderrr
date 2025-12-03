

// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "./Auth.css";
// import axios from "axios";


// const Login = ({ onClose, switchToSignup }) => {
//   const { login } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:5000/api/users/login", {
//       username,
//       password,
//     });
//     console.log("🔍 Login Response:", res.data);

//      localStorage.setItem("user", JSON.stringify(res.data));
//     login(res.data); // from AuthContext
//     if (onClose) onClose();
//   } catch (err) {
//     console.error("Login error:", err.response?.data || err.message);
//     alert(err.response?.data?.message || "Login failed. Try again!");
//   }
// };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-box">
//         <span className="close-btn" onClick={() => onClose && onClose()}>
//           ✕
//         </span>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p className="auth-switch">
//           Don’t have an account?{" "}
//           <span onClick={switchToSignup}>Sign up</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;










// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ import navigate
// import { AuthContext } from "../context/AuthContext";
// import "./Auth.css";
// import axios from "axios";

// const Login = ({ onClose, switchToSignup }) => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate(); // ✅ create navigate
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/users/login", {
//         username,
//         password,
//       });

//       // ✅ Save user in localStorage
//       localStorage.setItem("user", JSON.stringify(res.data));
//       login(res.data);

//       // ✅ Close popup or navigate to profile
//       if (onClose) {
//         onClose();
//       } else {
//         navigate("/profile"); // fallback navigation
//       }
//     } catch (err) {
//       console.error("Login error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Login failed. Try again!");
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-box">
//         <span className="close-btn" onClick={() => onClose && onClose()}>
//           ✕
//         </span>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">Login</button>
//         </form>
//         <p className="auth-switch">
//           Don’t have an account?{" "}
//           <span onClick={switchToSignup}>Sign up</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;











import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";
import axios from "axios";

const Login = ({ onClose = null, switchToSignup = null }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://resume-builderr-1.onrender.com/api/users/login", {
        username,
        password,
      });

      localStorage.setItem("resumeUser", JSON.stringify(res.data));
      login(res.data);

      // ✅ Close popup (if exists)
      if (typeof onClose === "function") onClose();

      // ✅ Navigate to profile
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed. Try again!");
    }
  };

  const handleSwitch = () => {
    if (typeof onClose === "function") onClose();
    if (typeof switchToSignup === "function") switchToSignup();
    else navigate("/signup"); // ✅ fallback for route mode
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <span
          className="close-btn"
          onClick={() => {
            if (typeof onClose === "function") onClose();
            else navigate("/"); // fallback if no popup
          }}
        >
          ✕
        </span>

        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        <p className="auth-switch">
          Don’t have an account?{" "}
          <span onClick={handleSwitch}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
