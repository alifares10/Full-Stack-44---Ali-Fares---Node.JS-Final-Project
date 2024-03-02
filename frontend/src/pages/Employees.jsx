import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ViewEmployeeShifts from "../components/viewEmployeeShifts";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@nextui-org/react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3001/employees", {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          setEmployees((prevData) => res.data);
        } else {
          console.log("Failed to get employees");
        }
      } catch (error) {
        console.log(error);
        console.log("Failed to get employees");
        //if the user has reached the maximum number of actions
        if (error.response.status === 403) {
          window.location.href = "http://localhost:5173/login";
          alert(error.response.data.message);
        }
      }
    };

    getEmployees();
  }, [token]);

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
          console.log("fetching departments");
        } else {
          console.log("Failed to get departments");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDepartments();
  }, [token]);

  const tableFilter = (e) => {
    if (e.target.value === "") {
      setFilteredEmployees([]);
    } else {
      setFilteredEmployees(
        employees.filter((employee) => employee.departmentID === e.target.value)
      );
    }
  };

  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4">
      <h1>Employees</h1>
      {!departments || !employees || !employeeShifts ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="flex items-center justify-between mx-auto w-full">
            <Button color="secondary" auto>
              <Link to="/employees/add">Add New Employee</Link>
            </Button>
            <select
              className="mx-1"
              id="department"
              name="department"
              onChange={tableFilter}
            >
              <option value="">All Departments</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          {filteredEmployees.length === 0 ? (
            <table className="border w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="p-4 border"> Name</th>

                  <th className="border p-4">Department ID</th>
                  <th className="border p-4">Shifts</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="p-4 border">
                      <Link to={`/employees/${employee._id}`}>
                        {employee.firstName} {employee.lastName}
                      </Link>
                    </td>

                    <td className="border">
                      {departments.map((department) => {
                        if (department._id === employee.departmentID) {
                          return department.name;
                        }
                      })}
                    </td>
                    <td className="border">
                      <ViewEmployeeShifts employee={employee} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="border w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="p-4 border"> Name</th>

                  <th className="p-4 border">Department ID</th>
                  <th className="p-4 border">Shifts</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="p-4 border">
                      <Link to={`/employees/${employee._id}`}>
                        {employee.firstName} {employee.lastName}
                      </Link>
                    </td>

                    <td className="p-4 border">
                      {departments.map((department) => {
                        if (department._id === employee.departmentID) {
                          return department.name;
                        }
                      })}
                    </td>
                    <td className="p-4 border">
                      <ViewEmployeeShifts employee={employee} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default Employees;
