import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App"; 

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${URL}/api/employees`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  
  const deleteEmployee = async (id) => {
    try {
      const res = await fetch(`${URL}/api/employees/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Employee List</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="border p-2 rounded-md"
        />
        <button
          onClick={() => navigate("/add-employee")}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Add Employee
        </button>
      </div>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="border-b px-4 py-2 text-left">Sno</th>
              <th className="border-b px-4 py-2 text-left">Image</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Mobile</th>
              <th className="border-b px-4 py-2 text-left">Designation</th>
              <th className="border-b px-4 py-2 text-left">Gender</th>
              <th className="border-b px-4 py-2 text-left">Course</th>
              <th className="border-b px-4 py-2 text-left">Created Date</th>
              <th className="border-b px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <tr key={employee._id}>
                  <td className="border-b px-4 py-2 text-center">{index + 1}</td>
                  <td className="border-b px-4 py-2 text-center">
                    <img
                      src={`${URL}/${employee.img}`}
                      alt={employee.name}
                      className="h-10 w-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="border-b px-4 py-2 text-center">{employee.name}</td>
                  <td className="border-b px-4 py-2 text-center">{employee.email}</td>
                  <td className="border-b px-4 py-2 text-center">{employee.mobile}</td>
                  <td className="border-b px-4 py-2 text-center">{employee.designation}</td>
                  <td className="border-b px-4 py-2 text-center">{employee.gender}</td>
                  <td className="border-b px-4 py-2 text-center">{employee.course}</td>
                  <td className="border-b px-4 py-2 text-center">{new Date (employee.createdAt).toLocaleDateString()}</td>
                  <td className="border-b px-4 py-2 flex space-x-2 text-center">
                    <button
                      onClick={() => navigate(`/edit-employee/${employee._id}`)}
                      className="bg-yellow-500 text-white p-2 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEmployee(employee._id)}
                      className="bg-red-500 text-white p-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
