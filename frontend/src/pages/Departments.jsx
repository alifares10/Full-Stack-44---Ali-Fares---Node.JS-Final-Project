import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ViewDepartmentWorkers from "../components/viewDepartmentWorkers";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:3001/departments", {
          headers: {
            "x-access-token": token,
          },
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

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3001/employees", {
          headers: {
            "x-access-token": token,
          },
        });
        if (res.status === 200) {
          setEmployees((prevData) => res.data);
        } else {
          console.log("Failed to get employees");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEmployees();
  }, [token]);

  const getManagerInfo = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/employees/${id}`, {
        headers: {
          "x-access-token": token,
        },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        console.log("Failed to get manager info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4">
      <h1>Departments</h1>
      {!departments || !employees ? (
        <p>Loading...</p>
      ) : (
        <>
          <Button color="secondary" auto>
            <Link to="/departments/add">Add New Department</Link>
          </Button>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Manager</th>
                <th className="px-4 py-2 border">Employees</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department) => (
                <tr key={department._id}>
                  <td className="border px-4 py-2">
                    <Link to={`/departments/${department._id}`}>
                      {" "}
                      {department.name}
                    </Link>
                  </td>

                  <td className="border px-4 py-2">
                    {employees.find(
                      (employee) => employee._id === department.manager
                    ) ? (
                      <Link
                        to={`/employees/${
                          employees.find(
                            (employee) => employee._id === department.manager
                          )._id
                        }`}
                      >
                        {employees.find(
                          (employee) => employee._id === department.manager
                        ).firstName +
                          " " +
                          employees.find(
                            (employee) => employee._id === department.manager
                          ).lastName}
                      </Link>
                    ) : (
                      "No Manager"
                    )}
                  </td>
                  <td className="border px-4 py-2 items-center justify-center flex">
                    <ViewDepartmentWorkers departmentId={department._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Departments;
