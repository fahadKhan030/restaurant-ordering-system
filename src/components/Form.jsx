import React from "react";
import { useState } from "react";
import { supabase } from "../lib/Supabase";

const Form = ({ setshowForm }) => {
  const [isloading, setIsloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [FromData, setFromData] = useState({
    name: "",
    description: "",
    price: "",
    MPrice: "",
    LPrice: "",
    category: "",
    image: null,
    isAvailable: false,
  });

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !FromData.name ||
      !FromData.description ||
      !FromData.price ||
      !FromData.category ||
      !FromData.image
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setIsloading(true);
    setSuccess(false);
    const fileName = `${Date.now()}-${FromData.image.name}`;

    try {
      const { error: uploaderror } = await supabase.storage
        .from("restaurant-images")
        .upload(fileName, FromData.image);

      if (uploaderror) {
        alert("Error uploading image: " + uploaderror.message);
        return;
      }

      console.log("Image uploaded successfully:", fileName);
    } catch (error) {
      alert("Error uploading image: " + error.message);
      return;
    }

    // Get image URL
    const { data: publicUrlData } = supabase.storage
      .from("restaurant-images")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    console.log("IMAGE URL:", imageUrl);

    // Insert data into database
    const { data, error } = await supabase.from("menu_items").insert([
      {
        Name: FromData.name,
        description: FromData.description,
        price: FromData.price,
        MPrice: FromData.MPrice,
        LPrice: FromData.LPrice,
        category: FromData.category,
        image_url: imageUrl,
        available: FromData.isAvailable,
      },
    ]);
    if (error) {
      alert("Error adding menu item: " + error.message);
    }
    setIsloading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

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
          onSubmit={formSubmitHandler}
          action=""
          className="flex flex-col gap-2 border border-gray-300 p-4 rounded-md"
        >
          <input
            className="border border-buttons focus:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Name"
            value={FromData.name}
            onChange={(e) => setFromData({ ...FromData, name: e.target.value })}
          />
          <input
            className="border border-buttons focus:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Description"
            value={FromData.description}
            onChange={(e) =>
              setFromData({ ...FromData, description: e.target.value })
            }
          />
          <input
            className="border border-buttons focus:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Regular Price"
            value={FromData.price}
            onChange={(e) =>
              setFromData({ ...FromData, price: e.target.value })
            }
          />
          <input
            className="border border-buttons focus:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Medium Price"
            value={FromData.MPrice}
            onChange={(e) =>
              setFromData({ ...FromData, MPrice: e.target.value })
            }
          />
          <input
            className="border border-buttons focus:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Large Price"
            value={FromData.LPrice}
            onChange={(e) =>
              setFromData({ ...FromData, LPrice: e.target.value })
            }
          />
          <input
            className="border border-buttons focus:outline-none px-3 py-1 rounded-2xl "
            type="text"
            placeholder="Category"
            value={FromData.category}
            onChange={(e) =>
              setFromData({ ...FromData, category: e.target.value })
            }
          />
          <input
            className="border border-buttons focus:outline-none px-3 py-1 rounded-2xl "
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) =>
              setFromData({ ...FromData, image: e.target.files[0] })
            }
          />
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={FromData.isAvailable}
              onChange={(e) =>
                setFromData({ ...FromData, isAvailable: e.target.checked })
              }
            />
            Available
          </label>
          <button
            type="submit"
            disabled={isloading}
            className="bg-buttons text-white py-2 px-4 rounded-full 
             hover:cursor-pointer disabled:opacity-70 
             disabled:cursor-not-allowed
             flex items-center justify-center gap-2"
          >
            {isloading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding...
              </>
            ) : (
              "Add Item"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
