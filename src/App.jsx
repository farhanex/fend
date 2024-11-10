import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
export const URL = "http://localhost:5000"
function App() {
  return (
      <Router>
    <AuthContextProvider>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />

        </Routes>
    </AuthContextProvider>
      </Router>
  );
}

export default App;
