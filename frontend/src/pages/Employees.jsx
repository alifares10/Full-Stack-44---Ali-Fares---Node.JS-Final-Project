import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import ViewEmployeeShifts from "../components/viewEmployeeShifts";
import { Link, Outlet } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeShifts, setEmployeeShifts] = useState([]);
  let test = [];

  const token = sessionStorage.getItem("accessToken");

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

  // useEffect(() => {
  //   const getEmployeeShifts = async () => {
  //     try {
  //       employees.map(async (employee) => {
  //         const res = await axios.get(
  //           `http://localhost:3001/employees/${employee._id}/shifts`,
  //           {
  //             headers: {
  //               "x-access-token": token,
  //             },
  //           }
  //         );
  //         if (res.status === 200) {
  //           const info = {
  //             employeeId: employee._id,
  //             Shifts: res.data,
  //           };
  //           employeeShifts.push(info);
  //           console.log(employeeShifts);
  //         } else {
  //           console.log("Failed to get employee shifts");
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getEmployeeShifts();
  // }, [employeeShifts, employees, token]);

  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4">
      <h1>Employees</h1>
      <table className="border w-full text-left">
        <thead>
          <tr>
            <th className="p-4"> Name</th>

            <th>Department ID</th>
            <th>Shifts</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="p-4">
                <Link to={`/employees/${employee._id}`}>
                  {employee.firstName} {employee.lastName}
                </Link>
              </td>

              <td>{employee.departmentID}</td>
              <td>
                <ViewEmployeeShifts employee={employee} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
