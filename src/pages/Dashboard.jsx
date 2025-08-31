


// import { useEffect, useState, useRef } from "react";
// import {
//   getStudents,
//   addStudent,
//   getDailyAttendance,
//   getMonthlyAttendance,
//   deleteStudent,
// } from "../api/api";
// import { QRCodeCanvas } from "qrcode.react";
// import "../style/Dashboard.css";

// function Dashboard() {
//   const [students, setStudents] = useState([]);
//   const [dailyReport, setDailyReport] = useState([]);
//   const [monthlyReport, setMonthlyReport] = useState([]);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [newStudent, setNewStudent] = useState({
//     name: "",
//     roll: "",
//     mobile: "",
//     address: "",
//     monthlyFee: "",
//   });
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const qrRef = useRef();
//   useEffect(() => {
//     fetchStudents();
//     fetchTodayReport();
//     fetchMonthlyReport();
//   }, []);

//   const fetchStudents = async () => {
//     const data = await getStudents();
//     setStudents(data);
//   };

//   const fetchTodayReport = async () => {
//     const today = new Date().toISOString().split("T")[0];
//     const data = await getDailyAttendance(today);
//     setDailyReport(data);
//   };

//   const fetchMonthlyReport = async () => {
//     const month = new Date().toISOString().slice(0, 7);
//     const data = await getMonthlyAttendance(month);
//     setMonthlyReport(data);
//   };

//   const handleAddStudent = async (e) => {
//   e.preventDefault();
//   setErrorMsg(""); // reset previous error

//   if (!newStudent.name || !newStudent.roll) {
//     setErrorMsg("Name & Roll are required!");
//     return;
//   }

//   try {
//     await addStudent(newStudent);
//     setNewStudent({ name: "", roll: "", mobile: "", address: "", monthlyFee: "" });
//     fetchStudents();
//     alert("Student added successfully!");
//   } catch (error) {
//     console.error(error);

//     // 🔹 Check for Mongo duplicate key error
//     const msg = error?.response?.data?.message || error.message || "";

//     if (msg.includes("E11000 duplicate key")) {
//       // parse the field from the error
//       const match = msg.match(/index: (\w+)_1 dup key/);
//       const field = match ? match[1] : "field";
//       setErrorMsg(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists!`);
//     } else {
//       setErrorMsg("Something went wrong. Please try again.");
//     }
//   }
// };


//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       await deleteStudent(id);
//       fetchStudents();
//       alert("Student deleted successfully!");
//     }
//   };


//   const handleDownloadQR = () => {
//     const canvas = qrRef.current.querySelector("canvas");
//     const url = canvas.toDataURL("image/png");

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "attendance-qr.png";
//     link.click();
//   };
//   // Filter monthly report by selected student
//   const filteredMonthlyReport = selectedStudent
//     ? monthlyReport.filter((r) => r.student._id === selectedStudent)
//     : monthlyReport;

//   const presentDays = filteredMonthlyReport.filter((r) => r.status === "Present").length;
//   const absentDays = filteredMonthlyReport.filter((r) => r.status === "Absent").length;

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">Admin Dashboard</h1>

//       {/* Top Grid: Add student + QR */}
//       <div className="grid-2 mb-6">
//         <div className="card">
//           <h2 className="card-title">➕ Add Student</h2>
//           <form onSubmit={handleAddStudent} className="form-grid">
//   <input
//     type="text"
//     placeholder="Name"
//     value={newStudent.name}
//     onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
//   />
//   <input
//     type="text"
//     placeholder="Roll"
//     value={newStudent.roll}
//     onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
//   />
//   <input
//     type="text"
//     placeholder="Mobile"
//     value={newStudent.mobile}
//     onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
//   />
//   <input
//     type="text"
//     placeholder="Address"
//     value={newStudent.address}
//     onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
//   />
//   <input
//     type="number"
//     placeholder="Monthly Fee"
//     value={newStudent.monthlyFee}
//     onChange={(e) => setNewStudent({ ...newStudent, monthlyFee: e.target.value })}
//   />
//   <button type="submit" className="btn-primary col-span-2">
//     Add Student
//   </button>

//   {errorMsg && <p className="error-text">{errorMsg}</p>}
// </form>

//         </div>

//         <div className="card qr-card">
//           <h2 className="card-title">📲 Attendance QR</h2>
//           <div className="qr-pulse" ref={qrRef}>
//             <QRCodeCanvas
//               value="http://localhost:5173/attendance"
//               size={160}
//               bgColor="#ffffff"
//               fgColor="#000000"
//               level="H"
//               className="qrcode"
//             />
//           </div>
//           <button onClick={handleDownloadQR} className="btn-primary mt-2">
//             Download QR
//           </button>
//           <p className="meta">Scan to mark attendance</p>
//         </div>

//       </div>

//       {/* Students */}
//       <div className="card mb-6">
//         <h2 className="card-title">👨‍🎓 Students</h2>
//         <div className="table-wrap">
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Roll</th>
//                 <th>Mobile</th>
//                 <th>Address</th>
//                 <th>Monthly Fee</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((s) => (
//                 <tr key={s._id}>
//                   <td>{s.name}</td>
//                   <td>{s.roll}</td>
//                   <td>{s.mobile}</td>
//                   <td>{s.address}</td>
//                   <td>{s.monthlyFee}</td>
//                   <td>
//                     <button onClick={() => handleDelete(s._id)} className="btn-danger">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Reports */}

//     </div>
//   );
// }

// export default Dashboard;





// import { useEffect, useState, useRef } from "react";
// import {
//   getStudents,
//   addStudent,
//   getDailyAttendance,
//   getMonthlyAttendance,
//   deleteStudent,
//   payStudentFee, // ✅ API for marking fee paid
// } from "../api/api";
// import { QRCodeCanvas } from "qrcode.react";
// import "../style/Dashboard.css";

// function Dashboard() {
//   const [students, setStudents] = useState([]);
//   const [dailyReport, setDailyReport] = useState([]);
//   const [monthlyReport, setMonthlyReport] = useState([]);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [newStudent, setNewStudent] = useState({
//     name: "",
//     roll: "",
//     mobile: "",
//     address: "",
//     monthlyFee: "",
//   });
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const qrRef = useRef();

//   useEffect(() => {
//     fetchStudents();
//     fetchTodayReport();
//     fetchMonthlyReport();
//   }, []);

//   const fetchStudents = async () => {
//     const data = await getStudents();
//     setStudents(data);
//   };

//   const fetchTodayReport = async () => {
//     const today = new Date().toISOString().split("T")[0];
//     const data = await getDailyAttendance(today);
//     setDailyReport(data);
//   };

//   const fetchMonthlyReport = async () => {
//     const month = new Date().toISOString().slice(0, 7);
//     const data = await getMonthlyAttendance(month);
//     setMonthlyReport(data);
//   };

//   const handleAddStudent = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (!newStudent.name || !newStudent.roll) {
//       setErrorMsg("Name & Roll are required!");
//       return;
//     }

//     try {
//       await addStudent(newStudent);
//       setNewStudent({ name: "", roll: "", mobile: "", address: "", monthlyFee: "" });
//       fetchStudents();
//       alert("Student added successfully!");
//     } catch (error) {
//       console.error(error);
//       const msg = error?.response?.data?.message || error.message || "";
//       if (msg.includes("E11000 duplicate key")) {
//         const match = msg.match(/index: (\w+)_1 dup key/);
//         const field = match ? match[1] : "field";
//         setErrorMsg(`${field.charAt(0).toUpperCase() + field.slice(1)} already exists!`);
//       } else {
//         setErrorMsg("Something went wrong. Please try again.");
//       }
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       await deleteStudent(id);
//       fetchStudents();
//       alert("Student deleted successfully!");
//     }
//   };

//   const handleDownloadQR = () => {
//     const canvas = qrRef.current.querySelector("canvas");
//     const url = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "attendance-qr.png";
//     link.click();
//   };

//   // Filter monthly report by selected student
//   const filteredMonthlyReport = selectedStudent
//     ? monthlyReport.filter((r) => r.student._id === selectedStudent)
//     : monthlyReport;

//   const presentDays = filteredMonthlyReport.filter((r) => r.status === "Present").length;
//   const absentDays = filteredMonthlyReport.filter((r) => r.status === "Absent").length;

//   const handlePay = async (id) => {
//     try {
//       await payStudentFee(id); // backend call to mark fee paid
//       fetchStudents();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">Admin Dashboard</h1>

//       {/* Top Grid: Add student + QR */}
//       <div className="grid-2 mb-6">
//         <div className="card">
//           <h2 className="card-title">➕ Add Student</h2>
//           <form onSubmit={handleAddStudent} className="form-grid">
//             <input
//               type="text"
//               placeholder="Name"
//               value={newStudent.name}
//               onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Roll"
//               value={newStudent.roll}
//               onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Mobile"
//               value={newStudent.mobile}
//               onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               value={newStudent.address}
//               onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
//             />
//             <input
//               type="number"
//               placeholder="Monthly Fee"
//               value={newStudent.monthlyFee}
//               onChange={(e) => setNewStudent({ ...newStudent, monthlyFee: e.target.value })}
//             />
//             <button type="submit" className="btn-primary col-span-2">
//               Add Student
//             </button>
//             {errorMsg && <p className="error-text">{errorMsg}</p>}
//           </form>
//         </div>

//         <div className="card qr-card">
//           <h2 className="card-title">📲 Attendance QR</h2>
//           <div className="qr-pulse" ref={qrRef}>
//             <QRCodeCanvas
//               value="http://localhost:5173/attendance"
//               size={160}
//               bgColor="#ffffff"
//               fgColor="#000000"
//               level="H"
//               className="qrcode"
//             />
//           </div>
//           <button onClick={handleDownloadQR} className="btn-primary mt-2">
//             Download QR
//           </button>
//           <p className="meta">Scan to mark attendance</p>
//         </div>
//       </div>

//       {/* Students */}
//       <div className="card mb-6">
//         <h2 className="card-title">👨‍🎓 Students</h2>
//         <div className="table-wrap">
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Roll</th>
//                 <th>Mobile</th>
//                 <th>Address</th>
//                 <th>Monthly Fee</th>
//                 <th>Payment</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((s) => (
//                 <tr key={s._id}>
//                   <td>{s.name}</td>
//                   <td>{s.roll}</td>
//                   <td>{s.mobile}</td>
//                   <td>{s.address}</td>
//                   <td>{s.monthlyFee}</td>
//                   <td>
//                     {s.paidThisMonth && <span className="paid-badge">Paid</span>}
//                     {!s.paidThisMonth && (
//                       <button onClick={() => handlePay(s._id)} className="btn-primary ml-2">
//                         Pay
//                       </button>
//                     )}
//                   </td>
//                   <td>
//                     <button onClick={() => handleDelete(s._id)} className="btn-danger">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



import { useEffect, useState, useRef } from "react";
import {
  getStudents,
  addStudent,
  deleteStudent,
  getDailyAttendance,
  getMonthlyAttendance,
  payStudentFee,
} from "../api/api";
import { QRCodeCanvas } from "qrcode.react";
import "../style/Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    roll: "",
    mobile: "",
    address: "",
    monthlyFee: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const qrRef = useRef();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };


  const handleAddStudent = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!newStudent.name || !newStudent.roll) {
      setErrorMsg("Name & Roll are required!");
      return;
    }

    try {
      await addStudent(newStudent);
      setNewStudent({ name: "", roll: "", mobile: "", address: "", monthlyFee: "" });
      fetchStudents();
      alert("Student added successfully!");
    } catch (error) {
      // Internal error handling, but do not show in UI
      console.error("Error adding student:", error); // optional for debugging
    }
  }
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      fetchStudents();
      alert("Student deleted successfully!");
    }
  };


  const handleDownloadQR = () => {
    const qrCanvas = qrRef.current.querySelector("canvas");
    const qrSize = qrCanvas.width;
    const margin = 40; // Har side se 40px margin

    // Naya canvas jisme margin + text bhi ho
    const newCanvas = document.createElement("canvas");
    const newSize = qrSize + margin * 2;
    newCanvas.width = newSize;
    newCanvas.height = newSize + 60; // Extra jagah text ke liye niche
    const ctx = newCanvas.getContext("2d");

    // Background white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    // QR ko beech me draw karo
    ctx.drawImage(qrCanvas, margin, margin);

    // Niche text add karo
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Scan to mark attendance", newCanvas.width / 2, newSize + 35);

    // Download trigger karo
    const url = newCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance-qr.png";
    link.click();
  };


  const togglePayment = async (studentId) => {
    await payStudentFee(studentId); // ✅ Marks as paid and resets next month automatically
    fetchStudents();
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Top Grid: Add Student + QR */}
      <div className="grid-2 mb-6">
        <div className="card">
          <h2 className="card-title">➕ Add Student</h2>
          <form onSubmit={handleAddStudent} className="form-grid">
            <input
              type="text"
              placeholder="Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Roll"
              value={newStudent.roll}
              onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
            />
            <input
              type="text"
              placeholder="Mobile"
              value={newStudent.mobile}
              onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={newStudent.address}
              onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
            />
            <input
              type="number"
              placeholder="Monthly Fee"
              value={newStudent.monthlyFee}
              onChange={(e) => setNewStudent({ ...newStudent, monthlyFee: e.target.value })}
            />
            <button type="submit" className="btn-primary col-span-2">
              Add Student
            </button>
            {errorMsg && <p className="error-text">{errorMsg}</p>}
          </form>
        </div>

        <div className="card qr-card">
          <h2 className="card-title">📲 Attendance QR</h2>
          <div className="qr-pulse" ref={qrRef}>
            <QRCodeCanvas
              value="https://libraryf.vercel.app/attendance"
              size={160}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              className="qrcode"
            />
          </div>
          <button onClick={handleDownloadQR} className="btn-primary mt-2">
            Download QR
          </button>
          <p className="meta">Scan to mark attendance</p>
        </div>
      </div>

      {/* Students List */}
      <div className="card mb-6">
        <h2 className="card-title">👨‍🎓 Students</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Monthly Fee</th>
                <th>Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>
                  <td>{s.mobile}</td>
                  <td>{s.address}</td>
                  <td>{s.monthlyFee}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={s.feesPaid >= s.monthlyFee}
                      onChange={() => togglePayment(s._id)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDelete(s._id)} className="btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
