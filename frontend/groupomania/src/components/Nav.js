import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navigation">
      <ul className="navigation__ul">
        <NavLink to="/">
          <li className="navigation__li">Signup</li>
        </NavLink>
        <NavLink to="/">
          <li className="navigation__li">Login</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Nav;
