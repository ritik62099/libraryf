import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/api"; // ✅ api.jsx se sahi import
import "../style/AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await adminLogin({ username, password }); // ✅ API call
      if (res.success) {
        // token save karlo (localStorage)
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      } else {
        setError(res.message || "Invalid login");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, try again!");
    }
  };

  return (
    <div className="login-container">
  <div className="login-card">
    <h2>🔑 Admin Login</h2>

    {error && <div className="error-msg">{error}</div>}

    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>

      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</div>
  );
}

export default AdminLogin;
