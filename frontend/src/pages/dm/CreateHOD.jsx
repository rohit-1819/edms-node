import React, { useState } from "react";
import axios from "axios";
import API from "../../api"; // adjust path if needed

const CreateHOD = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        const token = localStorage.getItem("token");
        console.log("Posting to:", `${API}/users`);
        console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

        const res = await API.post(
            "/users", // since in server.js you mounted userRoutes at /api/users
            {
                name,
                email,
                password,
                role: "HOD",   // must be included
                department
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setMessage(res.data.message || "HOD created successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setDepartment("");
    } catch (err) {
        console.error("Error creating HOD:", err.response?.data || err.message);
        setMessage(err.response?.data?.error || "Failed to create HOD.");
    }

  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", marginTop: "50px" }}>
      <h2>Create HOD Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

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

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Create HOD</button>
      </form>

      {message && <p style={{ marginTop: "15px", color: "green" }}>{message}</p>}
    </div>
  );
};

export default CreateHOD;
