import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      const token = data.token;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      if (role === "DM") {
        localStorage.setItem("DM_TOKEN", token);
      } else if (role === "HOD")  {
        localStorage.setItem("HOD_TOKEN", token);
      }

      if (role === "DM") {
        navigate("/dm-dashboard");
      } else if (role === "HOD") {
        navigate("/hod-dashboard");
      }
    } catch (err) {
      setError("Login Error: ", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
