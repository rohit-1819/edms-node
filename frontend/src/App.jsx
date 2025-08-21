import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DM_Dashboard from "./pages/DM/DM_dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dm/dashboard" element={<DM_Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
