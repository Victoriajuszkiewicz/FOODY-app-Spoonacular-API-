import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //this is a the css file used in react bootstrap libraries
import "./NavBar.css";
import { GiCookingPot } from "react-icons/gi";

const NavBar = () => {
  return (
    <nav className="navBar">
      <GiCookingPot />
      THIS SECTION SHOUD BE THE NAV BAR
    </nav>
  );
};

export default NavBar;
