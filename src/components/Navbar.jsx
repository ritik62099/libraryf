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


import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 🔹 token check function
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();

    // 🔹 Listen to storage changes (for multi-tabs or same app update)
    window.addEventListener("storage", checkAuth);

    // 🔹 Custom event listener
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // 🔹 Trigger custom event so Navbar update ho jaye bina refresh
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo / Title */}
        <Link to="/" className="logo">
          📚 Library Tracker
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/today">Today's Attendance</Link>  {/* added */}
          <Link to="/monthly">Monthly Attendance</Link> {/* added */}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/today">Today's Attendance</Link>   {/* added */}
          <Link to="/monthly">Monthly Attendance</Link> {/* added */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
