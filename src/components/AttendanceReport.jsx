import { useEffect, useState } from "react";
import { getDailyAttendance, getMonthlyAttendance, getStudents } from "../api/api";

function AttendanceReport() {
  const [students, setStudents] = useState([]);
  const [dailyReport, setDailyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const fetchDaily = async () => {
    if (!selectedDate) {
      alert("Please select a date!");
      return;
    }
    const data = await getDailyAttendance(selectedDate);
    setDailyReport(data);
  };

  const fetchMonthly = async () => {
    if (!selectedMonth) {
      alert("Please select a month!");
      return;
    }
    const data = await getMonthlyAttendance(selectedMonth);
    setMonthlyReport(data);
  };

  const filterByStudent = (records) => {
    if (!selectedStudent) return records;
    return records.filter((r) => r.studentId?._id === selectedStudent);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📑 Attendance Report</h1>

      {/* Daily Report Section */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <h2 className="text-xl font-semibold mb-3">📅 Daily Report</h2>
        <div className="flex gap-3 mb-3">
          <input
            type="date"
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">All Students</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.roll})
              </option>
            ))}
          </select>
          <button
            onClick={fetchDaily}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Show Report
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Roll</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filterByStudent(dailyReport).map((r) => (
              <tr key={r._id}>
                <td className="p-2 border">{r.studentId?.name}</td>
                <td className="p-2 border">{r.studentId?.roll}</td>
                <td className="p-2 border">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Monthly Report Section */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-3">🗓 Monthly Report</h2>
        <div className="flex gap-3 mb-3">
          <input
            type="month"
            className="border p-2 rounded"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">All Students</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.roll})
              </option>
            ))}
          </select>
          <button
            onClick={fetchMonthly}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Show Report
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Roll</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filterByStudent(monthlyReport).map((r) => (
              <tr key={r._id}>
                <td className="p-2 border">
                  {new Date(r.date).toLocaleDateString()}
                </td>
                <td className="p-2 border">{r.studentId?.name}</td>
                <td className="p-2 border">{r.studentId?.roll}</td>
                <td className="p-2 border">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceReport;
