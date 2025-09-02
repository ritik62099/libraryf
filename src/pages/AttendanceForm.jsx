// import { useState } from "react";
// import axios from "axios";
// import "../style/AttendanceForm.css";

// function AttendanceForm() {
//   const [roll, setRoll] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!roll || !name) {
//       alert("⚠ Please enter Roll & Name!");
//       return;
//     }

//     try {
//       setLoading(true);

//       // 🔹 1. Call public attendance route directly
//       const res = await axios.post(
//   "https://libraryapi-mu.vercel.app/api/attendance/public",
//   { roll, name, admin: adminId } // send admin ID
// );

//       alert(res.data.message || "✅ Attendance marked successfully!");

//       setRoll("");
//       setName("");
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to mark attendance");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="attendance-container">
//       <div className="attendance-card">
//         <h2 className="title">📋 Mark Attendance</h2>
//         <input
//           type="text"
//           placeholder="Enter Roll"
//           className="input"
//           value={roll}
//           onChange={(e) => setRoll(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter Name"
//           className="input"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button onClick={handleSubmit} disabled={loading} className="btn">
//           {loading ? "Submitting..." : "Submit Attendance"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AttendanceForm;



import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../style/AttendanceForm.css";

function AttendanceForm() {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const adminId =
    searchParams.get("admin") || localStorage.getItem("adminId"); // ✅ adminId

  const handleSubmit = async () => {
    if (!roll || !name) {
      alert("⚠ Please enter Roll & Name!");
      return;
    }

    if (!adminId) {
      alert("⚠ Admin ID missing! Scan correct QR.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://libraryapi-mu.vercel.app/api/attendance/public",
        { roll, name, admin: adminId } // ✅ adminId included
      );

      alert("✅ Attendance marked successfully!");
      setRoll("");
      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <h2 className="title">📋 Mark Attendance</h2>
        <input
          type="text"
          placeholder="Enter Roll"
          className="input"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading} className="btn">
          {loading ? "Submitting..." : "Submit Attendance"}
        </button>
      </div>
    </div>
  );
}

export default AttendanceForm;
