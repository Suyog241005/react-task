import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import EmployeePage from "./pages/EmployeePage";

// Employee Card Component

// Employee Detail Modal

// Main Dashboard Component
const App = () => {
  return  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EmployeeDashboard />} />
      <Route path="/:id" element={<EmployeePage />} />
    </Routes>
  </BrowserRouter>;
};

export default App;
