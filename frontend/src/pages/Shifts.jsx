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
          withCredentials: true,
        });
        if (res.status === 200) {
          setShifts((prevData) => res.data);
        } else {
          console.log("Failed to get shifts");
        }
      } catch (error) {
        console.log(error);
        //if the user has reached the maximum number of actions
        if (error.response.status === 403) {
          window.location.href = "http://localhost:5173/login";
          alert(error.response.data.message);
        }
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
          withCredentials: true,
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
          <table className="border w-full text-left table-auto">
            <thead>
              <tr>
                <th className="p-2 border">Shift Date</th>
                <th className="p-2 border">Shift Start</th>
                <th className="p-2 border">Shift End</th>
                <th className="p-2 border">Edit Shift</th>
                <th className="p-2 border">Add Employees</th>
              </tr>
            </thead>
            <tbody className="">
              {shifts.map((shift, index) => {
                return (
                  <tr key={shift._id}>
                    <td className="border p-2">
                      {shift.date.substring(0, 10)}
                    </td>
                    <td className="border p-2">{shift.startingHour}</td>
                    <td className="border p-2">{shift.endingHour}</td>
                    <td className="border p-2">
                      <EditShiftModal shift={shift} />
                    </td>
                    <td className="border p-2">
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
