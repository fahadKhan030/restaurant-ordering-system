import React from "react";
import { supabase } from "../../lib/Supabase";
import { useEffect, useState } from "react";

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
    <div className="p-4 bg-[#F9F6F3]">
      <h1>Menu</h1>
      <div>
        {menuItems.map((items) => {
          return (
            <div key={items.id}>
              <img src={items.image_url} alt={items.name} />
              <p>{items.Name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
