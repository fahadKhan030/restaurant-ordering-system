import React from "react";
import { NavLink } from "react-router";
import cross from "../../assets/cross.png";

const CheckOutForm = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div>
        <h3 className="text-3xl font-semibold">Checkout</h3>
        <p>please fill in your details to confirm your order</p>
      </div>
      <div>
        <from className="bg-white w-full">
          <h3 className="text-2xl font-semibold">Customer Information</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              delivery Address
            </label>
            <input
              type="address"
              placeholder="Enter your delivery address"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </from>
        <div></div>
      </div>
    </div>
  );
};

export default CheckOutForm;
