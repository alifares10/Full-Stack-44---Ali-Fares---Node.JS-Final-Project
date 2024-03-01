import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewUserActions from "../components/viewUserActions";

const Users = () => {
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users", {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          setUsers((prevData) => res.data);
        } else {
          console.log("Failed to get users");
        }
      } catch (error) {
        console.log(error);
        //if the user has reached the maximum number of actions
        if (error.response.status === 403) {
          window.location.href = "http://localhost:5173/login";
        }
        alert(error.response.data.message);
      }
    };

    getUsers();
  }, [token]);

  return (
    <div className="items-center mx-auto flex flex-col justify-center p-4 gap-4">
      <h1>Users</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Max Number Of Action</th>
            <th className="px-4 py-2 border">Current Number Of Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.numOfActions}</td>
              <td className="border px-4 py-2">
                <ViewUserActions id={user._id} userName={user.fullName} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
