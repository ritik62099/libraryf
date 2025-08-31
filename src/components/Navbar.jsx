// // import { Link, useNavigate } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import "../style/Navbar.css";

// // function Navbar() {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const navigate = useNavigate();

// //   // 🔹 Page load hone par check karo
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     setIsLoggedIn(!!token); // agar token hai to true
// //   }, []);

// //   // logout
// //   const handleLogout = () => {
// //     localStorage.removeItem("token"); 
// //     setIsLoggedIn(false); // UI update
// //     navigate("/login");
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="nav-container">
// //         {/* Logo / Title */}
// //         <Link to="/" className="logo">
// //           📚 Library Tracker
// //         </Link>

// //         {/* Desktop Menu */}
// //         <div className="nav-links">
// //           <Link to="/dashboard">Dashboard</Link>
// //           <Link to="/attendance">Attendance</Link>

// //           {isLoggedIn ? (
// //             <button onClick={handleLogout} className="logout-btn">
// //               Logout
// //             </button>
// //           ) : (
// //             <Link to="/login" className="login-btn">
// //               Login
// //             </Link>
// //           )}
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
// //           ☰
// //         </div>
// //       </div>

// //       {/* Mobile Menu */}
// //       {isOpen && (
// //         <div className="mobile-menu">
// //           <Link to="/dashboard">Dashboard</Link>
// //           <Link to="/attendance">Attendance</Link>
// //           {isLoggedIn ? (
// //             <button onClick={handleLogout} className="logout-btn">
// //               Logout
// //             </button>
// //           ) : (
// //             <Link to="/login" className="login-btn">
// //               Login
// //             </Link>
// //           )}
// //         </div>
// //       )}
// //     </nav>
// //   );
// // }

// // export default Navbar;


// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../style/Navbar.css";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // 🔹 token check function
//   const checkAuth = () => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   };

//   useEffect(() => {
//     checkAuth();

//     // 🔹 Listen to storage changes (for multi-tabs or same app update)
//     window.addEventListener("storage", checkAuth);

//     // 🔹 Custom event listener
//     window.addEventListener("authChange", checkAuth);

//     return () => {
//       window.removeEventListener("storage", checkAuth);
//       window.removeEventListener("authChange", checkAuth);
//     };
//   }, []);

//   // logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     // 🔹 Trigger custom event so Navbar update ho jaye bina refresh
//     window.dispatchEvent(new Event("authChange"));
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         {/* Logo / Title */}
//         <Link to="/" className="logo">
//           📚 Library Tracker
//         </Link>

//         {/* Desktop Menu */}
//         <div className="nav-links">
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/attendance">Attendance</Link>

//           {isLoggedIn ? (
//             <button onClick={handleLogout} className="logout-btn">
//               Logout
//             </button>
//           ) : (
//             <Link to="/login" className="login-btn">
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
//           ☰
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="mobile-menu">
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/attendance">Attendance</Link>
//           {isLoggedIn ? (
//             <button onClick={handleLogout} className="logout-btn">
//               Logout
//             </button>
//           ) : (
//             <Link to="/login" className="login-btn">
//               Login
//             </Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // ==== Internal CSS ====
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
      display: "flex",
      gap: "1.5rem",
      flexDirection: "row",
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
      display: "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    mobileMenu: {
      display: "none",
      flexDirection: "column",
      backgroundColor: "#2563eb",
      padding: "1rem",
      gap: "0.8rem",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => navigate("/")}>
          📚 Library Tracker
        </div>

        {/* Desktop & Mobile Links */}
        <div
          style={{
            ...styles.navLinks,
            display: window.innerWidth <= 768 ? (isOpen ? "flex" : "none") : "flex",
            flexDirection: window.innerWidth <= 768 ? "column" : "row",
            gap: window.innerWidth <= 768 ? "0.8rem" : "1.5rem",
            backgroundColor: window.innerWidth <= 768 ? "#2563eb" : "transparent",
            padding: window.innerWidth <= 768 ? "1rem" : 0,
          }}
        >
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
            <button
              style={styles.logoutBtn}
              onClick={() => { handleLogout(); setIsOpen(false); }}
            >
              Logout
            </button>
          ) : (
            <button style={styles.loginBtn} onClick={() => { handleLogin(); setIsOpen(false); }}>
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          style={{
            ...styles.menuToggle,
            display: window.innerWidth <= 768 ? "block" : "none",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
