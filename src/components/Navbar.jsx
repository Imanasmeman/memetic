// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/Authcontexts";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./Navbar.css"; 

const Navbar = () => {
  const { user, username } = useAuth();
  const navigate = useNavigate();
   const handleBack = () => {
    navigate(-1);
  };


  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    // ...existing code...
// ...existing code...
// ...existing code...
<nav className="navbar">
  <div className="navbar-left">
    {user && (
      <button onClick={handleBack} className="navbar-icon-btn" title="Back">
        <span role="img" aria-label="Back">⬅️</span>
      </button>
    )}
    <Link to="/" className="navbar-logo">
      <span className="navbar-logo-icon" role="img" aria-label="Meme">😎</span>
      <span style={{ marginLeft: 8 }}>Memetic</span>
    </Link>
    {user && (
      <Link to="/editor" className="navbar-create-btn">
        <span role="img" aria-label="Create">➕</span> Create Meme
      </Link>
    )}
  </div>
  <div className="navbar-right">
    {user ? (
      <>
        <span className="navbar-welcome">Hi, {username}</span>
        <button onClick={handleLogout} className="navbar-logout-btn">
          <span role="img" aria-label="Logout">🚪</span> Logout
        </button>
      </>
    ) : (
      <Link to="/login" className="navbar-login-btn">
        <span role="img" aria-label="Login">🔑</span> Login
      </Link>
    )}
  </div>
</nav>
// ...existing code...

// ...existing code...
  );
}
 

  // ...existing code...
const styles = {
  nav: {
    padding: "0.75rem 1rem",
    background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    gap: "0.5rem",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1.3rem",
    color: "white",
    textDecoration: "none",
    letterSpacing: "1px",
  },
  logoIcon: {
    fontSize: "1.7rem",
    filter: "drop-shadow(0 2px 4px #0003)",
  },
  iconBtn: {
    background: "none",
    border: "none",
    color: "#61dafb",
    fontSize: "1.3rem",
    cursor: "pointer",
    marginRight: "0.3rem",
    transition: "color 0.2s",
    padding: "0.3rem",
  },
  createBtn: {
    background: "#61dafb",
    border: "none",
    padding: "0.4rem 0.9rem",
    cursor: "pointer",
    textDecoration: "none",
    color: "#232526",
    borderRadius: "6px",
    fontWeight: 600,
    marginLeft: "0.5rem",
    fontSize: "0.95rem",
    boxShadow: "0 1px 4px #0002",
    transition: "background 0.2s",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    justifyContent: "flex-end",
    width: "100%",
  },
  welcome: {
    fontSize: "0.95rem",
    marginRight: "0.3rem",
    color: "#b3e5fc",
    fontWeight: 500,
  },
  loginBtn: {
    background: "#fff",
    color: "#232526",
    border: "none",
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "0.95rem",
    boxShadow: "0 1px 4px #0002",
    transition: "background 0.2s",
  },
  logoutBtn: {
    background: "#ff5252",
    color: "#fff",
    border: "none",
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
    boxShadow: "0 1px 4px #0002",
    transition: "background 0.2s",
  },
};

// Responsive styles for larger screens (optional, for inline styles)
if (window.innerWidth >= 600) {
  styles.nav.flexDirection = "row";
  styles.nav.alignItems = "center";
  styles.left.justifyContent = "flex-start";
  styles.left.gap = "1rem";
  styles.logo.fontSize = "1.6rem";
  styles.logoIcon.fontSize = "2rem";
  styles.createBtn.fontSize = "1rem";
  styles.right.gap = "1rem";
  styles.welcome.fontSize = "1rem";
  styles.loginBtn.fontSize = "1rem";
  styles.logoutBtn.fontSize = "1rem";
}
// ...existing code...
export default Navbar;
