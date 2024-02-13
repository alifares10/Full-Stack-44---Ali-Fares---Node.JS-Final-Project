/* eslint-disable react/prop-types */
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link, useNavigate, Outlet } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const name = sessionStorage.getItem("name");

  const handleLogout = async () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Navbar isBordered>
        <NavbarBrand className="cursor-pointer">
          <Link className="font-bold text-inherit " to={"/"}>
            {name ? name : "Home"}
          </Link>
        </NavbarBrand>
        <NavbarItem className=" flex">
          <Button auto>
            <Link to={"/employees"}>Employees</Link>
          </Button>
        </NavbarItem>
        <NavbarItem className=" flex">
          <Button auto>
            {" "}
            <Link to={"/shifts"}>Shifts</Link>
          </Button>
        </NavbarItem>
        <NavbarItem className=" flex">
          <Button onClick={handleLogout} auto>
            Log Out
          </Button>
        </NavbarItem>
        <NavbarContent justify="end"></NavbarContent>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;
