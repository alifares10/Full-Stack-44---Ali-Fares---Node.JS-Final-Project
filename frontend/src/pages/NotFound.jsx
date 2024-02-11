import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="items-center mx-auto justify-center flex p-4 flex-col">
      <h1 className="p-4">404 Page Not Found</h1>
      <Link className="p-4 " to="/">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
