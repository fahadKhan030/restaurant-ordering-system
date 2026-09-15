import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Romove from "../../assets/Remove.png";

const Cart = () => {
  const { Cart, removeItem, IncreaseQuantity } = useContext(CartContext);

  return (
    <div className="fixed right-0 top-10 p-5 bg-white rounded-xl w-[350px]">
      <div className="flex items-center justify-between">
        <button></button>
        <h4 className="text-2xl font-semibold">Cart</h4>
        <div></div>
      </div>
      {Cart.map((item) => {
        return (
          <article
            key={item.id}
            className="flex border-dotted border-b-1 w-full mt-5 "
          >
            <div>
              <img src={item.image_url} alt={item.Name} className="h-30" />
            </div>

            <div>
              <div>
                <h5 className="text-xl font-semibold">{item.Name}</h5>
                <p className="text-[13px] text-gray-600">{item.description}</p>
              </div>

              <h5 className="font-semibold">{item.price * item.quantity}</h5>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="bg-[#4D0610] px-2 rounded-2xl text-white">
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => IncreaseQuantity(item.id)}
                    className="bg-[#4D0610] px-2 rounded-2xl text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item)}
                  className="hover:cursor-pointer"
                >
                  <img src={Romove} alt="" className="h-4" />
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Cart;
