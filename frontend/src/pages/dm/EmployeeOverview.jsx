import { useEffect, useState } from "react";
import API from "../../api";

export default function EmployeeOverview() {
  const [hods, setHods] = useState([]);
  const [selectedHod, setSelectedHod] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Step 1: Fetch all HODs so DM can choose one
    const fetchHods = async () => {
      try {
        const res = await API.get('/users/role/hods'); // 👈 depends on your backend, adjust if needed
        setHods(res.data);
      } catch (err) {
        console.error("Error fetching HODs:", err);
      }
    };

    fetchHods();
  }, []);

  const fetchEmployees = async (hodId) => {
    try {
      const res = await API.get(`/employees/${hodId}`); // ✅ pass hod_id
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Overview</h2>

      {/* Dropdown to select HOD */}
      <label>
        Select HOD:
        <select
          value={selectedHod || ""}
          onChange={(e) => {
            const hodId = e.target.value;
            setSelectedHod(hodId);
            fetchEmployees(hodId);
          }}
        >
          <option value="">-- Choose HOD --</option>
          {hods.map((hod) => (
            <option key={hod.id} value={hod.id}>
              {hod.name} ({hod.department})
            </option>
          ))}
        </select>
      </label>

      {/* Show employees for selected HOD */}
      {employees.length > 0 && (
        <>
          <h3>Employees under this HOD</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.verified ? "✔️" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
