// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AdminLogin from "./pages/AdminLogin";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import AttendanceForm from "./pages/AttendanceForm";
// import QRCodePage from "./pages/QRCodePage";
// import AttendanceReport from "./components/AttendanceReport";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//          <Navbar /> {/* 👈 हर पेज पर navbar */}
//       <Routes>
//         {/* Public route */}
//         <Route path="/login" element={<AdminLogin />} />

//         {/* Public (for students via QR) */}
//         <Route path="/attendance" element={<AttendanceForm />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/qrcode"
//           element={
//             <ProtectedRoute>
//               <QRCodePage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/reports"
//           element={
//             <ProtectedRoute>
//               <AttendanceReport />
//             </ProtectedRoute>
//           }
//         />

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import AdminLogin from "./pages/AdminLogin";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import AttendanceForm from "./pages/AttendanceForm";
// import QRCodePage from "./pages/QRCodePage";
// import AttendanceReport from "./components/AttendanceReport";
// import TodayAttendance from "./components/TodayAttendance"; // new
// import MonthlyAttendance from "./components/MonthlyAttendance"; // new
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* 👈 हर पेज पर navbar */}
//       <Routes>
//         {/* Public route */}
//         <Route path="/login" element={<AdminLogin />} />

//         {/* Public (for students via QR) */}
//         <Route path="/attendance" element={<AttendanceForm />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/qrcode"
//           element={
//             <ProtectedRoute>
//               <QRCodePage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/reports"
//           element={
//             <ProtectedRoute>
//               <AttendanceReport />
//             </ProtectedRoute>
//           }
//         />

//         {/* New Protected Routes */}
//         <Route
//           path="/today"
//           element={
//             <ProtectedRoute>
//               <TodayAttendance />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/monthly"
//           element={
//             <ProtectedRoute>
//               <MonthlyAttendance />
//             </ProtectedRoute>
//           }
//         />

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnim from "./assets/Book loading.json";

import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AttendanceForm from "./pages/AttendanceForm";
import QRCodePage from "./pages/QRCodePage";
import AttendanceReport from "./components/AttendanceReport";
import TodayAttendance from "./components/TodayAttendance";
import MonthlyAttendance from "./components/MonthlyAttendance";
import ProtectedRoute from "./components/ProtectedRoute";

import API from "./api/api.jsx"; // ✅ Default export
import { adminLogin, getStudents } from "./api/api.jsx"; // Named exports

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/me"); // check token validity
        setIsAdminLoggedIn(true);
      } catch {
        setIsAdminLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdminLoggedIn(false);
    delete API.defaults.headers.common["Authorization"];
  };

  if (checkingAuth) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Lottie animationData={loaderAnim} loop={true} style={{ width: 200, height: 200 }} />
      </div>
    );
  }

  return (
    <Router>
      <Navbar isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} />
        <Route path="/attendance" element={<AttendanceForm />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qrcode"
          element={
            <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <QRCodePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <AttendanceReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/today"
          element={
            <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <TodayAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monthly"
          element={
            <ProtectedRoute isAdminLoggedIn={isAdminLoggedIn}>
              <MonthlyAttendance />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
