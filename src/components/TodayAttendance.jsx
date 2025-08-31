import { useEffect, useState } from "react";
import { getDailyAttendance } from "../api/api";

function TodayAttendance() {
  const [dailyReport, setDailyReport] = useState([]);

  useEffect(() => {
    fetchTodayReport();
  }, []);

  const fetchTodayReport = async () => {
    const today = new Date().toISOString().split("T")[0];
    const data = await getDailyAttendance(today);
    setDailyReport(data);
  };

  return (
    <div className="card">
      <h2 className="card-title">📅 Today Attendance</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Roll</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dailyReport.map((r) => (
              <tr key={r._id}>
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

export default TodayAttendance;
