
import React from 'react';
import { NavLink } from 'react-router-dom';

const Logout = () => {
    return (
        <div className='navigation'>
           <ul className="navigation__ul">
           <NavLink to="/Login">
          <li className=" navigation__li">Logout</li>
        </NavLink>
        </ul>
        </div>
    );
};

export default Logout;