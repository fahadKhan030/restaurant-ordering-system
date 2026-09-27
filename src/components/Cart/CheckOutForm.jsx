import React from "react";
import { NavLink } from "react-router";
import cross from "../../assets/cross.png";

const CheckOutForm = () => {
  return (
    <div className="flex items-center flex-col   justify-center fixed top-0 left-0 bg-white/20 backdrop-blur-lg   w-full h-[100lvh]">
      <NavLink
        to="/"
        className="fixed top-4 right-3 backdrop-blur-lg bg-white/20 p-1 border border-black rounded-full "
      >
        <img src={cross} alt="" className="h-5" />
      </NavLink>
      <form action="" className="bg-white flex flex-col gap-2 p-3 rounded-md">
        <input
          type="text"
          className=" border-1 border-gray-500 rounded-md py-1 px-3"
          placeholder="Enter your name"
        />
        <input
          type="text"
          className=" border-1 border-gray-500 rounded-md py-1 px-3"
          placeholder="your address  "
        />
        <input
          type="number"
          className="border-1 border-gray-500 rounded-md py-1 px-3"
          placeholder="your ph number"
        />
      </form>
    </div>
  );
};

export default CheckOutForm;
