import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
    setIsOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };

  const styles = {
    navbar: {
      backgroundColor: "#1e40af",
      color: "white",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    container: {
      maxWidth: "1200px",
      margin: "auto",
      padding: "0 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
    navLinks: {
  flexDirection: isMobile ? "column" : "row",
  position: isMobile ? "absolute" : "static",
  top: isMobile ? "64px" : "auto",
  left: 0,
  width: isMobile ? "100%" : "auto",
  backgroundColor: isMobile ? "#2563eb" : "transparent",
  padding: isMobile ? "1rem" : 0,
  display: isMobile ? (isOpen ? "flex" : "none") : "flex", // ✅ only once
  gap: isMobile ? "0.8rem" : "1.5rem",
  zIndex: 90,
},
    navLink: {
      color: "white",
      fontWeight: 500,
      cursor: "pointer",
    },
    logoutBtn: {
      backgroundColor: "#dc2626",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      color: "white",
      fontWeight: 500,
      cursor: "pointer",
    },
    loginBtn: {
      backgroundColor: "#2563eb",
      padding: "6px 12px",
      borderRadius: "6px",
      color: "white",
      fontWeight: 500,
      cursor: "pointer",
    },
    menuToggle: {
      display: isMobile ? "block" : "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => navigate("/")}>
          📚 Library Tracker
        </div>

        {/* Menu Links */}
        <div style={styles.navLinks}>
          <div style={styles.navLink} onClick={() => { navigate("/dashboard"); setIsOpen(false); }}>
            Dashboard
          </div>
          <div style={styles.navLink} onClick={() => { navigate("/attendance"); setIsOpen(false); }}>
            Attendance
          </div>
          <div style={styles.navLink} onClick={() => { navigate("/today"); setIsOpen(false); }}>
            Today's Attendance
          </div>
          <div style={styles.navLink} onClick={() => { navigate("/monthly"); setIsOpen(false); }}>
            Monthly Attendance
          </div>

          {isLoggedIn ? (
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button style={styles.loginBtn} onClick={handleLogin}>
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div style={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
