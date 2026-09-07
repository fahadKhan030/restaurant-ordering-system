import React from "react";

const Buttons = () => {
  const buttons = [
    {
      id: 1,
      Category: "Hot Selling",
    },
    {
      id: 2,
      Category: "Burgers",
    },
    {
      id: 3,
      Category: "Pizza",
    },
    {
      id: 4,
      Category: "Salads",
    },
    {
      id: 5,
      Category: "Drinks",
    },
    {
      id: 6,
      Category: "Chickens",
    },
  ];

  return (
    <div className="flex justify-center flex-wrap gap-2">
      {buttons.map((button) => (
        <button
          key={button.id}
          className="bg-[#F0E7C7] text-black text-sm py-1.5 px-4 rounded-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {button.Category}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
