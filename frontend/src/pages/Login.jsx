import React from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const onsSubmit = async (e) => {
    try {
      e.preventDefault();
      const username = e.target.elements[0].value;
      const email = e.target.elements[1].value;
      const res = await axios.post(
        "http://localhost:3001/login",
        {
          username,
          email,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        const data = res.data;
        // save data to session storage
        sessionStorage.setItem("Username", data.userInfo.username);
        sessionStorage.setItem("Email", data.userInfo.email);
        sessionStorage.setItem("name", data.userInfo.name);
        sessionStorage.setItem("accessToken", data.accessToken);

        navigate("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
      //if the user has reached the maximum number of actions
      if (error.response.status === 403) {
        document.getElementById("message").innerText =
          "You Have Reached The Maximum Number Of Actions For Today. Please Try Again Tomorrow.";
      }
    }
  };

  return (
    <div className=" flex justify-center items-start p-4">
      <div className="flex justify-center items-center flex-col bg-black border">
        <h1 className="text-4xl font-extrabold ">Log In</h1>

        <form
          onSubmit={onsSubmit}
          className="flex flex-col justify-center items-center w-full p-4 "
        >
          <input
            type="text"
            placeholder="Username"
            className="w-80 my-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-80 my-2"
            required
          />
          <Button auto type="submit" className="w-80 my-2">
            Log In
          </Button>

          <p
            id="message"
            className="text-4xl font-extrabold text-secondary p-2"
          ></p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
