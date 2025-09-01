// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://libraryapi-mu.vercel.app/api", // backend ka base URL
// });

// // ====== 🔑 Token auto-attach karne ka setup ======
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token"); 
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// // ====== ADMIN LOGIN ======
// export const adminLogin = async (credentials) => {
//   const res = await API.post("/admin/login", credentials);
//   if (res.data.token) {
//     localStorage.setItem("token", res.data.token);
//   }
//   return res.data;
// };

// // ====== STUDENTS ======
// export const getStudents = async () => {
//   const res = await API.get("/students");
//   return res.data;
// };

// export const addStudent = async (student) => {
//   const res = await API.post("/students", student);
//   return res.data;
// };

// export const deleteStudent = async (id) => {
//   const res = await API.delete(`/students/${id}`); // ✅ Fixed
//   return res.data;
// };

// // ====== ATTENDANCE ======
// export const markAttendance = async (studentId) => {
//   const res = await API.post("/attendance", { studentId });
//   return res.data;
// };

// export const getDailyAttendance = async (date) => {
//   const res = await API.get(`/attendance/daily/${date}`);
//   return res.data;
// };

// export const getMonthlyAttendance = async (month) => {
//   const res = await API.get(`/attendance/monthly/${month}`);
//   return res.data;
// };


// export const payStudentFee = async (id) => {
//   const res = await API.put(`/students/pay/${id}`);
//   return res.data;
// };


import axios from "axios";

// ✅ Axios instance
const API = axios.create({
  baseURL: "https://libraryapi-mu.vercel.app/api",
  // baseURL: "http://localhost:5000/api",
});

// ====== 🔑 Token auto-attach ======
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ====== Named exports ======
export const adminLogin = async (credentials) => {
  const res = await API.post("/admin/login", credentials);
  if (res.data.token) localStorage.setItem("token", res.data.token);
  return res.data;
};

export const getStudents = async () => {
  const res = await API.get("/students");
  return res.data;
};

export const addStudent = async (student) => {
  const res = await API.post("/students", student);
  return res.data;
};

export const deleteStudent = async (id) => {
  const res = await API.delete(`/students/${id}`);
  return res.data;
};

export const markAttendance = async (studentId) => {
  const res = await API.post("/attendance", { studentId });
  return res.data;
};

export const getDailyAttendance = async (date) => {
  const res = await API.get(`/attendance/daily/${date}`);
  return res.data;
};

export const getMonthlyAttendance = async (month) => {
  const res = await API.get(`/attendance/monthly/${month}`);
  return res.data;
};

export const payStudentFee = async (id) => {
  const res = await API.put(`/students/pay/${id}`);
  return res.data;
};

// ✅ Default export for Axios instance
export default API;

