import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/login", { email, password });
      const { token, user } = res.data;
      const role = user.role;

      console.log("Login Successful:", res.data);
      console.log("Base URL -->", import.meta.env.VITE_API_BASE_URL);

      // Save token + role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "DM") navigate("/dm/dashboard");
      else if (role === "HOD") navigate("/hod/dashboard");
      else navigate("/"); // fallback
    } catch (err) {
      console.error("Login failed:", err);
      
      if (err.response) {
        console.error("🔎 Backend response:", err.response.data);
        setError(err.response.data.message || "Invalid credentials");
      } else if (err.request) {
        console.error("🚨 No response from server:", err.request);
        setError("No response from server. Check API URL.");
      } else {
        console.error("⚠️ Error setting up request:", err.message);
        setError("Unexpected error: " + err.message);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
