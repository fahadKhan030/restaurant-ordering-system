import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li>
          <NavLink to="menu">Menu</NavLink>
        </li>

        <li>
          <NavLink to="orders">Orders</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
