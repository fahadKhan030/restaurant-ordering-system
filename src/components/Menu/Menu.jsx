import React from "react";
import { supabase } from "../../lib/Supabase";
import { useEffect, useState } from "react";
import Add from "../../assets/addIcon.png";

const Menu = () => {
  const [menuItems, setmenuItems] = useState([]);
  useEffect(() => {
    const MenuData = async () => {
      const { data, error } = await supabase.from("menu_items").select("*");
      if (error) {
        return;
      }

      setmenuItems(data);
    };

    MenuData();
  }, []);
  console.log(menuItems);
  return (
    <div className="px-4 py-10 bg-[#F9F6F3]">
      <div className="flex flex-col items-center py-10  justify-around mx-auto ">
        <h1 className="text-xl md:text-2xl lg:text-6xl font-bold text-[#4D0610]">
          PICK YOU CRAVING{" "}
        </h1>
        <p className="text-[#777B7A] text-[13px]">
          Every bits hits different. Choose Your Category and feast
        </p>
      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4  ">
        {menuItems.map((items) => {
          return (
            <div
              key={items.id}
              className="bg-white border border-gray-400 p-3 rounded-2xl"
            >
              <img
                src={items.image_url}
                alt={items.name}
                className="w-full  object-contain rounded-2xl"
              />
              <div className="flex flex-col gap-0">
                <h4 className="text-xl font-bold">{items.Name}</h4>
                <span className="text-[#777B7A] text-[13px]">
                  {items.description}
                </span>
              </div>
              <div className="flex justify-between mt-3 text-center">
                <span className="text-md text-[#FF7B40] font-semibold">
                  {items.price.toFixed(2)}
                </span>
                <button className=" bg-[#4D0610] p-1 rounded-md hover:cursor-pointer text-2xl">
                  <img src={Add} alt="add" className="h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
};

export default Menu;
