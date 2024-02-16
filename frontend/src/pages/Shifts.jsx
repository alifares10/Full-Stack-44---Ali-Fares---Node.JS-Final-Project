import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";

import AddShiftModal from "../components/addShiftModal";
import EditShiftModal from "../components/editShiftModal";
import AddEmployessToShift from "../components/addEmployessToShift";

const Shifts = () => {
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [shiftEmployees, setShiftEmployees] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const getShifts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/shifts", {
          headers: {
            "x-access-token": token,
          },
        });
        if (res.status === 200) {
          setShifts((prevData) => res.data);
        } else {
          console.log("Failed to get shifts");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getShifts();
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

  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4 ">
      <h1>Shifts</h1>
      {!shifts || !employees || !shiftEmployees ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <AddShiftModal />
          <table className="border w-full text-left">
            <thead>
              <tr>
                <th>Shift Date</th>
                <th>Shift Start</th>
                <th>Shift End</th>
                <th>Edit Shift</th>
                <th>Add Employees</th>
              </tr>
            </thead>
            <tbody className="">
              {shifts.map((shift, index) => {
                return (
                  <tr key={shift._id}>
                    <td>{shift.date.substring(0, 10)}</td>
                    <td>{shift.startingHour}</td>
                    <td>{shift.endingHour}</td>
                    <td>
                      <EditShiftModal shift={shift} />
                    </td>
                    <td>
                      <AddEmployessToShift
                        employees={employees}
                        shift={shift}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Shifts;
