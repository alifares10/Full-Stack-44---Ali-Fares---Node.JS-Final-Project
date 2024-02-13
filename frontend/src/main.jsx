import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/Header.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Employees from "./pages/Employees";
import EditEmployee from "./pages/EditEmployee.jsx";
import Shifts from "./pages/Shifts.jsx";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

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
            <Home />
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
