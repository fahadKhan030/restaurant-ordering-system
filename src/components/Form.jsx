import React from "react";

const Form = ({ setshowForm }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blur-2xl  w-screen h-screen flex flex-col gap-2 p-4 bg-[#f3eee8] text-center">
      <div className="flex flex-col gap-2 items-center justify-center mx-auto">
        {" "}
        <button
          className="bg-red-500 text-white  px-2 rounded-full hover:bg-red-600 hover:cursor-pointer"
          onClick={() => setshowForm(false)}
        >
          close
        </button>
        <h5 className="text-lg font-semibold text-red-600">Add New Item</h5>
        <form
          action=""
          className="flex flex-col gap-2 border border-gray-300 p-4 rounded-md"
        >
          <input
            className="border border-buttons fous:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Name"
          />
          <input
            className="border border-buttons fous:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Description"
          />
          <input
            className="border border-buttons fous:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Price"
          />
          <input
            className="border border-buttons fous:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Category"
          />
          <input
            className="border border-buttons fous:outline-none px-3 py-1 rounded-2xl "
            type="file"
            accept="image/png, iamge/jpeg"
          />
          <label>
            <input type="checkbox" className="mr-2" />
            Available
          </label>
          <button className="bg-buttons text-white py-2 px-4 rounded-full  hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
