import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewUserActions = (info) => {
  const [actions, setActions] = useState("");
  const token = sessionStorage.getItem("accessToken");
  const id = info.id;
  useEffect(() => {
    const getActions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/users/${id}/actions`,
          {
            headers: {
              "x-access-token": token,
            },
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setActions((prevData) => res.data);
        } else {
          console.log("Failed to get actions");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getActions();
  }, [token, id, info.userName]);

  return <div>{actions}</div>;
};

export default ViewUserActions;
