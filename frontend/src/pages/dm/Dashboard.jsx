import React from "react";
import { useNavigate } from "react-router-dom";

const DM_Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>District Magistrate Dashboard</h1>
      <p>Welcome, DM! Choose an action below:</p>

      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <button onClick={() => navigate("/dm/create-hod")}>
          Create HOD Accounts
        </button>

        <button onClick={() => navigate("/dm/post-announcement")}>
          Post Announcements
        </button>

        <button onClick={() => navigate("/dm/view-hods")}>
          View HODs
        </button>

        <button onClick={() => navigate("/dm/employee-overview")}>
          Employee Overview
        </button>
      </div>
    </div>
  );
};

export default DM_Dashboard;
