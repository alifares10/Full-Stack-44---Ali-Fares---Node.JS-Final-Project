import React from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();

  return <div>EditEmployee {id}</div>;
};

export default EditEmployee;
