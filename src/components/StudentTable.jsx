function StudentTable({ students }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-3">👨‍🎓 Students List</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Roll</th>
            <th className="p-2 border">Mobile</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Month Payment</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No students found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s._id}>
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.roll}</td>
                <td className="p-2 border">{s.mobile}</td>
                <td className="p-2 border">{s.address}</td>
                <td className="p-2 border">{s.monthPayment || "Unpaid"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
