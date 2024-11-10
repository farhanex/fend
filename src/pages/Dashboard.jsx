import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-blue-500">
              Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link to="/employee-list" className="text-gray-700 hover:text-blue-500">
              Employee List
            </Link>
            <span className="text-gray-700">{user}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user}!</h1>
        <p className="text-gray-700">This is your dashboard.</p>
      </main>
    </div>
  );
};

export default Dashboard;
