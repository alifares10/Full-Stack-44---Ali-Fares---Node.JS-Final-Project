import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/Header.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./pages/Login";
import Employees from "./pages/Employees";
import EditEmployee from "./pages/EditEmployee.jsx";
import Shifts from "./pages/Shifts.jsx";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import Departments from "./pages/Departments.jsx";
import EditDepartment from "./pages/EditDepartment.jsx";
import AddDepartment from "./pages/addDepartment.jsx";
import Users from "./pages/Users.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Header />
      </ProtectedRoutes>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Employees />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/employees",
        element: (
          <ProtectedRoutes>
            <Employees />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/shifts",
        element: (
          <ProtectedRoutes>
            <Shifts />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/employees/:id",
        element: (
          <ProtectedRoutes>
            <EditEmployee />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/employees/add",
        element: (
          <ProtectedRoutes>
            <AddEmployee />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/departments",
        element: (
          <ProtectedRoutes>
            <Departments />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/departments/:id",
        element: (
          <ProtectedRoutes>
            <EditDepartment />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/departments/add",
        element: (
          <ProtectedRoutes>
            <AddDepartment />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoutes>
            <Users />
          </ProtectedRoutes>
        ),
        errorElement: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ProtectedRoutes>
        <LogIn />
      </ProtectedRoutes>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
