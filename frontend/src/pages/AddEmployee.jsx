import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:3001/departments", {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          setDepartments((prevData) => res.data);
        } else {
          console.log("Failed to get departments");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const startWorkYear = e.target.startYear.value;
    const departmentID = e.target.department.value;
    const newEmployee = {
      firstName,
      lastName,
      startWorkYear,
      departmentID,
    };
    try {
      const res = await axios.post(
        "http://localhost:3001/employees",
        newEmployee,
        {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        console.log("Employee added");
        alert("Employee added");
        e.target.reset();
      } else {
        console.log("Failed to add employee");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add employee");
    }
  };

  console.log(departments);
  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4 ">
      <h1>Add New Employee</h1>
      <form
        className="p-1 border items-center mx-auto justify-center flex flex-col gap-3 "
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-3 my-1 py-1">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required />
          <label htmlFor="startYear">Start Year</label>
          <input type="number" id="startYear" name="startYear" required />
          <label htmlFor="department">Department</label>
          <select className="mb-1" id="department" name="department" required>
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 p-2">
          <Button type="submit">Add Employee</Button>
          <Button color="danger" auto>
            <Link to="/employees">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
