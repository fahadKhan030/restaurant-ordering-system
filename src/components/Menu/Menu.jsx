import React from "react";
import { supabase } from "../../lib/Supabase";
import { useEffect, useState } from "react";
import Add from "../../assets/addIcon.png";
import Category from "../Category/Buttons";

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
        <span className="text-[#FD7C3A] border-1 px-2 py-1 rounded-2xl border-[#FD7C3A] text-[13px] font-semibold">
          Menu
        </span>
        <h1 className="text-xl md:text-2xl lg:text-6xl font-bold text-[#4D0610]">
          PICK YOU CRAVING{" "}
        </h1>
        <p className="text-[#777B7A] pb-5 text-[13px]">
          Every bits hits different. Choose Your Category and feast
        </p>
        <Category />
      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4  ">
        {menuItems.map((items) => {
          return (
            <div
              key={items.id}
              className="border border-gray-400 bg-white p-3 rounded-2xl"
            >
              <img
                src={items.image_url}
                alt={items.name}
                className="w-full  object-contain rounded-2xl"
              />
              {/* Name,Description and Price*/}
              <div className="flex justify-between">
                <div>
                  <h4 className="text-xl font-bold">{items.Name}</h4>
                  <span className="text-gray-500 text-[13px]">
                    {items.description}
                  </span>
                </div>
                <span className="text-md text-[#4D0610] font-bold">
                  {items.price.toFixed(2)}
                </span>
              </div>
              {/* buttons for medium and large prices */}
              {/* <div className="flex gap-2 mt-2">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    className="bg-[#4D0610] p-1 rounded-md hover:cursor-pointer text-[8px] text-white w-full mt-2"
                  >
                    {button.name}
                  </button>
                ))}
              </div> */}
              {/* add to cart  */}
              <div className="flex justify-between mt-3 text-center">
                <button className=" bg-[#4D0610] p-1 rounded-md hover:cursor-pointer text-md text-white w-full">
                  Add to cart
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
