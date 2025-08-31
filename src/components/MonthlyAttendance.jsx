import { useEffect, useState } from "react";
import { getStudents, getMonthlyAttendance } from "../api/api";
import "../style/MonthlyAttendance.css";

function MonthlyAttendance() {
  const [students, setStudents] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchMonthlyReport();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const fetchMonthlyReport = async () => {
    const month = new Date().toISOString().slice(0, 7);
    const data = await getMonthlyAttendance(month);
    setMonthlyReport(data);
  };

  const filteredMonthlyReport = selectedStudent
    ? monthlyReport.filter((r) => r.student._id === selectedStudent)
    : monthlyReport;

  const presentDays = filteredMonthlyReport.filter((r) => r.status === "Present").length;
  const absentDays = filteredMonthlyReport.filter((r) => r.status === "Absent").length;

  return (
    <div className="card">
      <h2 className="card-title">🗓 Monthly Attendance</h2>
      <div>
        <label>Select Student: </label>
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="">All Students</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        {selectedStudent && (
          <p>
            Present: {presentDays} days | Absent: {absentDays} days
          </p>
        )}
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Roll</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMonthlyReport.map((r) => (
              <tr key={r._id}>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.student.name}</td>
                <td>{r.student.roll}</td>
                <td>
                  <span className={r.status === "Present" ? "status present" : "status absent"}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyAttendance;
