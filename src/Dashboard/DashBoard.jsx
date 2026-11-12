import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const DashBoard = () => {
  return (
    <div>
      <header></header>
      <main className="flex gap-10">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
