// import { useState } from "react";
// import { getStudents, markAttendance } from "../api/api";
// import "../style/AttendanceForm.css";

// function AttendanceForm() {
//   const [roll, setRoll] = useState("");
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Submit attendance
//   const handleSubmit = async () => {
//     if (!roll || !name) {
//       alert("⚠ Please enter Roll & Name!");
//       return;
//     }
//     try {
//       setLoading(true);

//       // 1. Get all students
//       const students = await getStudents();

//       // 2. Find student by roll + name
//       const student = students.find(
//         (s) =>
//           s.roll.toLowerCase() === roll.toLowerCase() &&
//           s.name.toLowerCase() === name.toLowerCase()
//       );

//       if (!student) {
//         alert("❌ Student not found! Please check Roll & Name");
//         return;
//       }

//       // 3. Mark attendance using studentId
//       const res = await markAttendance(student._id);
//       alert(res.msg || "✅ Attendance marked successfully!");

//       // reset
//       setRoll("");
//       setName("");
//     } catch (err) {
//       alert("Failed to mark attendance");
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

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="btn"
//         >
//           {loading ? "Submitting..." : "Submit Attendance"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AttendanceForm;




import { useState } from "react";
import axios from "axios";
import { markAttendance } from "../api/api";
import "../style/AttendanceForm.css";

function AttendanceForm() {
  const [roll, setRoll] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!roll || !name) {
      alert("⚠ Please enter Roll & Name!");
      return;
    }

    try {
      setLoading(true);

      // 🔹 1. Fetch students from public route
      const res = await axios.get("https://libraryapi-mu.vercel.app/api/students/public");
      const students = res.data;

      console.log("Students:", students); // debugging

      // 🔹 2. Find student
      const student = students.find(
        (s) =>
          s.roll.trim().toLowerCase() === roll.trim().toLowerCase() &&
          s.name.trim().toLowerCase() === name.trim().toLowerCase()
      );

      if (!student) {
        alert("❌ Student not found! Please check Roll & Name");
        return;
      }

      // 🔹 3. Mark attendance
      const attendanceRes = await markAttendance(student._id);
      alert(attendanceRes.message || "✅ Attendance marked successfully!");

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
