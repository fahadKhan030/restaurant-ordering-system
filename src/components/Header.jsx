import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#f3eee8]">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl md:text-3xl font-semibold">Full Menu</h1>
        <p className="text-gray-600 text-[12px]">
          78 dishes made fresh to order, delivered to your door.
        </p>
      </div>

      <div className="relative">
        <button className="absolute right-1.5 top-1.5 bg-buttons rounded-full text-[16px] px-3 py-0.5">
          Search
        </button>
        <input
          type="search"
          placeholder="Search dishes..."
          className="border border-gray-300 rounded-full py-2 px-3 bg-white focus:outline-none focus:ring-2 w-[250px] focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Header;
