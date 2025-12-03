



import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Signup from "./Signup";
import Login from "./Login";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Popup visibility
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setShowDropdown(false);
  };

  // Protect pages (ask login before navigating)
  const handleProtectedNav = (path) => {
    if (!user) {
      setShowLogin(true);
      return;
    }
    navigate(path);
  };

  // Switch between Login <-> Signup
  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <>
      <nav style={styles.navbar}>
        {/* Logo */}
        <h2 style={styles.logo} onClick={() => navigate("/")}>
          ResumeExpert
        </h2>

        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <button
            style={styles.linkBtn}
            onClick={() => handleProtectedNav("/templates")}
            onMouseEnter={(e) => e.target.style.color = styles.linkBtnHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.linkBtn.color}
          >
            Templates
          </button>
          <button
            style={styles.linkBtn}
            onClick={() => handleProtectedNav("/profile")}
            onMouseEnter={(e) => e.target.style.color = styles.linkBtnHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.linkBtn.color}
          >
            Profile
          </button>
        </div>

        {/* Auth Section */}
        <div style={styles.authSection}>
          {!user ? (
            <>
              <button 
                style={styles.loginBtn}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.loginBtnHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.loginBtn.backgroundColor}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <button
                style={styles.signupBtn}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.signupBtnHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.signupBtn.backgroundColor}
                onClick={() => setShowSignup(true)}
              >
                Signup
              </button>
            </>
          ) : (
            <div
              style={styles.avatarContainer}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              
              <div style={styles.avatar}>
 {user
  ? (user.username?.[0] || user.name?.[0] || user.email?.[0] || "U").toUpperCase()
  : "U"}

</div>

              {showDropdown && (
                <div style={styles.dropdown}>
                  <p
                    style={styles.dropdownItem}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </p>
                  <p 
                    style={styles.dropdownItem} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Popups */}
      {showSignup && (
        <Signup
          onClose={() => setShowSignup(false)}
          switchToLogin={handleSwitchToLogin}
        />
      )}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          switchToSignup={handleSwitchToSignup}
        />
      )}
    </>
  );
}

/* --- Enhanced Inline Styles --- */
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "16px 48px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  },
  logo: {
    cursor: "pointer",
    color: "#1a1a1a",
    fontWeight: "700",
    fontSize: "24px",
    margin: 0,
    letterSpacing: "-0.5px",
    transition: "color 0.2s ease",
    userSelect: "none",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
  },
  link: {
    textDecoration: "none",
    color: "#4a4a4a",
    fontWeight: "500",
    fontSize: "15px",
    transition: "color 0.2s ease",
    position: "relative",
  },
  linkBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#4a4a4a",
    fontWeight: "500",
    fontSize: "15px",
    padding: "8px 0",
    transition: "color 0.2s ease",
    position: "relative",
  },
  linkBtnHover: {
    color: "#673ab7",
  },
  authSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },
  loginBtn: {
    border: "2px solid #e0e0e0",
    padding: "10px 24px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    color: "#4a4a4a",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  loginBtnHover: {
    backgroundColor: "#f5f5f5",
  },
  signupBtn: {
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    backgroundColor: "#673ab7",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(103, 58, 183, 0.2)",
  },
  signupBtnHover: {
    backgroundColor: "#5e35b1",
  },
  avatarContainer: {
    position: "relative",
    cursor: "pointer",
  },
  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "#673ab7",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "18px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 2px 8px rgba(103, 58, 183, 0.2)",
    userSelect: "none",
  },
  dropdown: {
    position: "absolute",
    top: "56px",
    right: 0,
    backgroundColor: "white",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    borderRadius: "12px",
    overflow: "hidden",
    width: "140px",
    border: "1px solid rgba(0, 0, 0, 0.06)",
    animation: "fadeIn 0.15s ease",
  },
  dropdownItem: {
    padding: "14px 16px",
    cursor: "pointer",
    margin: 0,
    fontSize: "14px",
    fontWeight: "500",
    color: "#4a4a4a",
    transition: "background-color 0.15s ease",
    borderBottom: "1px solid #f0f0f0",
  },
  dropdownItemHover: {
    backgroundColor: "#f8f8f8",
  },
};

export default Navbar;