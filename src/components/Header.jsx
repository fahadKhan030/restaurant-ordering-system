import React, { useContext } from "react";
import carticon from "../assets/carticon.png";

import { useState } from "react";
import { CartContext } from "../Context/CartContext";

const Header = () => {
  const { togglec, Cart } = useContext(CartContext);

  return (
    <div className="flex items-center justify-between p-4 bg-[#f3eee8]">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-3xl font-semibold">Full Menu</h1>
        <p className="text-gray-600 text-[12px]">
          78 dishes made fresh to order, delivered to your door.
        </p>
      </div>

      <div className="relative hidden md:block">
        <button className="absolute right-1.5 top-1.5 bg-buttons rounded-full text-[16px] px-3 py-0.5">
          Search
        </button>
        <input
          type="search"
          placeholder="Search dishes..."
          className="border border-gray-300 rounded-full py-2 px-3 bg-white focus:outline-none focus:ring-2 w-[250px] focus:ring-blue-500"
        />
      </div>
      <button
        onClick={togglec}
        className="relative  p-1.5 rounded-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {Cart.length === 0 ? (
          <p className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-buttons rounded-full text-[8px]">
            0
          </p>
        ) : (
          <p className="absolute top-0 right-0 h-4 w-4 flex items-center justify-center bg-buttons rounded-full text-[8px]">
            {Cart.length}
          </p>
        )}

        <img src={carticon} alt="" className="h-8" />
      </button>
    </div>
  );
};

export default Header;
