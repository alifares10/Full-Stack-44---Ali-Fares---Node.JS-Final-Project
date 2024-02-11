import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  // const [employeeShifts, setEmployeeShifts] = useState([]);
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
  //           // setEmployeeShifts((prevData) => res.data);
  //           const test = res.data.map((shift) => {
  //             return {
  //               ...employee,
  //               shifts: shift,
  //             };
  //           });

  //           console.log(test);
  //         } else {
  //           console.log("Failed to get employee shifts");
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getEmployeeShifts();
  // }, [employees, token]);

  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4">
      <h1>Employees</h1>
      <table className="border w-full text-left">
        <thead>
          <tr>
            <th className="p-4">First Name</th>
            <th>Last Name</th>
            <th>Department ID</th>
            <th>Shifts</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td className="p-4">{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.departmentID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
