import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@nextui-org/react";

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState();
  const [employees, setEmployees] = useState([]);
  const [newManager, setNewManager] = useState("");
  const [employeeToTransfer, setEmployeeToTransfer] = useState("");
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/departments/${id}`, {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          setDepartment((prevData) => res.data);
        } else {
          console.log("Failed to get department");
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

    getDepartment();
  }, [id, token]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;

    if (newManager === "") {
      const newDepartment = {
        name,
      };
      try {
        const res = await axios.put(
          `http://localhost:3001/departments/${id}`,
          newDepartment,
          {
            headers: {
              "x-access-token": token,
            },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          console.log("Department updated");
          alert("Department updated");
        } else {
          console.log("Failed to update department");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    } else {
      const newDepartment = {
        name,
      };
      try {
        const res = await axios.put(
          `http://localhost:3001/departments/${id}`,
          newDepartment,
          {
            headers: {
              "x-access-token": token,
            },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          try {
            const res = await axios.put(
              `http://localhost:3001/departments/${id}/manager`,
              {
                managerId: newManager,
              },
              {
                headers: {
                  "x-access-token": token,
                },
                withCredentials: true,
              }
            );
            if (res.status === 200) {
              console.log("Department updated");
              alert("Department updated");
            } else {
              console.log("Failed to update department");
            }
          } catch (error) {
            console.log(error);
            alert(error.response.data.message);
          }
        } else {
          console.log("Failed to update department");
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    setNewManager(e.target.value);
  };

  const deleteDepartment = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/departments/${id}`,
        {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log("Department deleted");
        alert("Department deleted");
        window.location.href = "/departments";
      } else {
        console.log("Failed to delete department");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const transferEmployee = async (e) => {
    console.log(employeeToTransfer);
    if (employeeToTransfer === "") {
      alert("Please select an employee");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:3001/employees/${employeeToTransfer}/department`,
        {
          newDepartment: id,
        },
        {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        console.log("Employee transferred");
        alert("Employee transferred");
      } else {
        console.log("Failed to transfer employee");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="items-center mx-auto flex w-full justify-center p-4 gap-4 h-full">
      {!department || !employees ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="items-center justify-center flex mx-auto">
            {department.name}
          </h1>
          <h2 className="text-3xl items-center justify-center flex mx-auto">
            Edit Department{" "}
          </h2>
          <form className="flex flex-col gap-4 border p-4" onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={department.name}
            />
            <label htmlFor="manager">Manager</label>
            <select id="manager" value={newManager} onChange={handleChange}>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName}
                </option>
              ))}
            </select>

            <Button type="submit">Update</Button>
          </form>
          <div className="flex flex-col gap-4 border p-4">
            <h1>Transfer Employees</h1>
            <select
              className="mx-1"
              id="employee"
              name="employee"
              onChange={(e) => setEmployeeToTransfer(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees
                .filter((employee) => employee.departmentID !== department._id)
                .map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
            </select>
            <Button
              color="default"
              className=" flex my-1"
              onClick={transferEmployee}
            >
              Transfer
            </Button>
          </div>
          <Button
            color="danger"
            className=" flex my-1"
            onClick={deleteDepartment}
          >
            Delete Department
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditDepartment;
