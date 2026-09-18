import React from "react";

const CheckOutForm = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 bg-red-600 w-full h-[100lvh]">
      <form action="" className="bg-white flex flex-col gap-2 p-3 rounded-md">
        <input
          type="text"
          className=" border-1 border-gray-500 rounded-md p-1"
          placeholder="Enter your name"
        />
        <input
          type="text"
          className=" border-1 border-gray-500 rounded-md p-1"
          placeholder="your address  "
        />
        <input
          type="number"
          className="border-1 border-gray-500 rounded-md p-1"
          placeholder="your ph number"
        />
      </form>
    </div>
  );
};

export default CheckOutForm;
