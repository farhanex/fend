import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../App"; 

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    img: "", 
  });
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchEmployee = async () => {
    try {
      const res = await fetch(`${URL}/api/employees/id/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      const data = await res.json();
      console.log("Fetched employee data:", data); 
      if (res.ok) {
        setEmployeeData({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          designation: data.designation,
          gender: data.gender,
          course: data.course,
          img: `${URL}/${data.img}`, 
        });
      } else {
        console.error("Failed to fetch employee details");
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false); 
    }
  };

  
  console.log("Employee ID:", id);

  useEffect(() => {
    fetchEmployee(); 
  }, [id]); 

  useEffect(() => {
    console.log("Employee Data:", employeeData); 
  }, [employeeData]);

  
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
      const res = await fetch(`${URL}/api/employees/${id}`, {
        method: "PUT", 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (res.ok) {
        navigate("/employee-list"); 
      } else {
        console.error("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="name"
          value={employeeData.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded-md w-full mb-4"
          required
        />
        <input
          type="email"
          name="email"
          value={employeeData.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded-md w-full mb-4"
          required
        />
        <input
          type="text"
          name="mobile"
          value={employeeData.mobile || ""}
          onChange={handleChange}
          placeholder="Mobile"
          className="border p-2 rounded-md w-full mb-4"
          required
        />
        <select
          name="designation"
          value={employeeData.designation || ""}
          onChange={handleChange}
          className="border p-2 rounded-md w-full mb-4"
          required
        >
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        <select
          name="gender"
          value={employeeData.gender || ""}
          onChange={handleChange}
          className="border p-2 rounded-md w-full mb-4"
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="course"
          value={employeeData.course || ""}
          onChange={handleChange}
          className="border p-2 rounded-md w-full mb-4"
          required
        >
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BSC">BSC</option>
        </select>
        <label className="block mb-4">
          Profile Image
          <input type="file" onChange={handleFileChange} />
        </label>
        {employeeData.img && (
          <div className="mb-4">
            <img
              src={`${URL}/uploads/${employeeData.img}`} 
              alt="Profile"
              className="w-24 h-24 object-cover"
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
