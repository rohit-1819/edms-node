import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DM_Dashboard from "./pages/DM/DM_dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dm/dashboard" element={<DM_Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
