import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DM_Dashboard from "./pages/dm/Dashboard";
import CreateHOD from "./pages/dm/CreateHOD";
import HODDashboard from "./pages/hod/Dashboard";
import EmployeeDashboard from "./pages/employee/Dashboard";
import RequireAuth from "./utils/RequireAuth";
import EmployeeOverview from "./pages/dm/EmployeeOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dm/*" element={
          <RequireAuth role="DM"><DM_Dashboard /></RequireAuth>
        } />
        <Route path="/dm/create-hod" element={
          <RequireAuth role="DM"><CreateHOD /></RequireAuth>
        } />
        <Route path="/dm/employee-overview" element={
          <RequireAuth role="DM"><EmployeeOverview /></RequireAuth>
        } />
        <Route path="/hod/*" element={
          <RequireAuth role="HOD"><HODDashboard /></RequireAuth>
        } />
        <Route path="/employee/*" element={
          <RequireAuth role="Employee"><EmployeeDashboard /></RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
