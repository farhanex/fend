import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App"; 

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR", 
    gender: "Male", 
    course: "MCA", 
  });
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(employeeData).forEach((key) => {
      formData.append(key, employeeData[key]);
    });
    if (img) formData.append("img", img);

    try {
      const res = await fetch(`${URL}/api/employees`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (res.ok) {
        navigate("/employee-list"); 
      } else {
        console.error("Failed to add employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="text"
          name="mobile"
          value={employeeData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="border p-2 rounded-md w-full"
          required
        />

        <select
          name="designation"
          value={employeeData.designation}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>

        <select
          name="gender"
          value={employeeData.gender}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          name="course"
          value={employeeData.course}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
          required
        >
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BSC">BSC</option>
        </select>

        <label className="block">
          Profile Image:
          <input
            type="file"
            onChange={handleFileChange}
            className="block mt-2"
            required
          />
        </label>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
