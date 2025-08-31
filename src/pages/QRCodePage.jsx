import { QRCodeSVG } from "qrcode.react";

function QRCodePage() {
  const attendanceUrl = `${window.location.origin}/attendance`; 
  // Example: http://localhost:5173/attendance

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold mb-4">📌 Library Attendance QR</h2>
        <QRCodeSVG value={attendanceUrl} size={256} /> {/* ✅ */}
        <p className="mt-4 text-gray-600">Scan this QR to mark attendance</p>
        <p className="mt-2 text-sm text-gray-500">{attendanceUrl}</p>
      </div>
    </div>
  );
}

export default QRCodePage;
