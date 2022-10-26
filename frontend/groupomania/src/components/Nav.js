import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="navigation">
      <ul className="navigation__ul">
        <NavLink to="/Signup">
          <li className="navigation__li">S'inscrire</li>
        </NavLink>
        <NavLink to="/Login">
          <li className="navigation__li">Se connecter</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Nav;
