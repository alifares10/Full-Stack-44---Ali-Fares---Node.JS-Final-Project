/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const checkIsAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3001/auth", {
          headers: {
            "x-access-token": token,
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          console.log("isAuth: true");
        } else {
          console.log("isAuth: false");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.log("isAuth: false");
        navigate("/login", { replace: true });
      }
    };

    checkIsAuth();
  }, [token, navigate]);

  return children;
};

export default ProtectedRoutes;
