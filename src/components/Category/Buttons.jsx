import React from "react";

const Buttons = ({ menuItems, filterItems, setFilterItems }) => {
  const handleFilter = (category) => {
    if (category === "all") {
      setFilterItems(menuItems);
      return;
    }
    const filteredItems = filterItems.filter(
      (items) => items.category === category,
    );
    console.log(category);
    setFilterItems(filteredItems);

    // const filteredItems = menuItems.filter(
    //   (item) => item.category === category,
    // );
    // if (filteredItems.length === 0) {
    //   alert(`No items found in this ${category} category`);
    // }
    // setFilterItems(filteredItems);
  };

  const buttons = [
    {
      id: 1,
      Category: "all",
    },
    {
      id: 2,
      Category: "burger",
    },
    {
      id: 3,
      Category: "pizza",
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
          onClick={() => handleFilter(button.Category)}
        >
          {button.Category}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
