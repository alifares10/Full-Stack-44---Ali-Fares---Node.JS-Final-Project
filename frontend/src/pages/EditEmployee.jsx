import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";
import AddEmployessToShift from "../components/addEmployessToShift";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState();
  const [departments, setDepartments] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newShift, setNewShift] = useState("");
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/employees/${id}`, {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          setEmployee((prevData) => res.data);
        } else {
          console.log("Failed to get employee");
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

    getEmployee();
  }, [id, token]);

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
      }
    };

    getShifts();
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const startWorkYear = e.target.year.value;
    if (newDepartment === "") {
      //if the department is not changed
      try {
        const res = await axios.put(
          `http://localhost:3001/employees/${id}`,
          {
            firstName,
            lastName,
            startWorkYear,
          },
          {
            headers: {
              "x-access-token": token,
            },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          console.log("Employee updated");
          alert("Employee updated");
        } else {
          console.log("Failed to update employee");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    } else {
      //if the department is changed
      try {
        const res = await axios.put(
          `http://localhost:3001/employees/${id}`,
          {
            firstName,
            lastName,
            startWorkYear,
            departmentID: newDepartment,
          },
          {
            headers: {
              "x-access-token": token,
            },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          console.log("Employee updated");
          alert("Employee updated");
        } else {
          console.log("Failed to update employee");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  const handleShiftAdd = async (e) => {
    e.preventDefault();
    if (newShift === "") {
      alert("Please select a shift");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:3001/employees/${id}/shifts`,
        { shiftId: newShift },
        {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log("Employee added to shift");
        alert("Employee added to shift");
      } else {
        console.log("Failed to add employee to shift");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleEmployeeDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:3001/employees/${id}`, {
        headers: {
          "x-access-token": token,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log("Employee deleted");
        alert("Employee deleted");
        window.location.href = "/employees";
      } else {
        console.log("Failed to delete employee");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="items-center mx-auto dark:flex w-full justify-center p-4 gap-4 h-full">
      {!employee || !departments || !shifts ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <form className="grid grid-cols-3 border p-2 " onSubmit={onSubmit}>
            <h1 className="dark:font-extrabold">Edit Employee Data</h1>
            <div className="flex flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={employee?.firstName}
                className="w-fit"
              ></input>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={employee?.lastName}
              ></input>
              <label htmlFor="year">Start Years</label>
              <input
                type="text"
                id="year"
                name="year"
                defaultValue={employee?.startWorkYear}
              ></input>
              <label htmlFor="department">Department</label>
              <Select
                label="Select a Department"
                className="max-w-xs text-black"
                id="departmentID"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
              >
                {departments.map((department) => (
                  <SelectItem key={department._id} textValue={department._id}>
                    {department.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <Button className=" flex my-1" type="submit">
              Update
            </Button>
          </form>
          <div className="p-2 border">
            <h1>Add To Shift</h1>
            <Select
              label="Select a Shift"
              className="max-w-xs text-black"
              id="ShiftId"
              value={newShift}
              onChange={(e) => setNewShift(e.target.value)}
            >
              {shifts.map((shift) => (
                <SelectItem key={shift._id} textValue={shift._id}>
                  {shift.date.substring(0, 10)}, {shift.startingHour} -{" "}
                  {shift.endingHour}
                </SelectItem>
              ))}
            </Select>
            <Button className=" flex my-1" onClick={handleShiftAdd}>
              Add
            </Button>
          </div>
          <div className="p-2 border items-center mx-auto justify-center flex">
            <Button
              className=" flex my-1"
              variant="solid"
              color="danger"
              onClick={handleEmployeeDelete}
            >
              Delete Employee
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditEmployee;
