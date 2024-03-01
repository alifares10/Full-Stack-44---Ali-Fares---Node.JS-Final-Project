import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const AddDepartment = () => {
  const [employees, setEmployees] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const newDepartment = {
      name,
    };
    try {
      const res = await axios.post(
        "http://localhost:3001/departments",
        newDepartment,
        {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        console.log("Department added");
        alert("Department Created");
        window.location.href = "/departments";
        e.target.reset();
      } else {
        console.log("Failed to add department");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      //if the user has reached the maximum number of actions
      if (error.response.status === 403) {
        window.location.href = "http://localhost:5173/login";
      }
      alert(error.response.data.message);
    }
  };

  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4 ">
      <h1>Create New Department</h1>
      <form
        className="p-3 border items-center mx-auto justify-center flex flex-col gap-4  "
        onSubmit={onSubmit}
      >
        <label htmlFor="name">Department Name :</label>
        <input
          className="mx-1"
          type="text"
          name="name"
          placeholder="Enter department name"
          required
        />
        <div className="flex gap-2 p-2">
          <Button className="" type="submit">
            Create Department
          </Button>
          <Button color="danger" auto>
            <Link to="/departments">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
