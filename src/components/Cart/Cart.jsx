import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Romove from "../../assets/Remove.png";

const Cart = () => {
  const [number, setNumber] = useState(1);
  const { Cart, removeItem } = useContext(CartContext);

  const itemQuntity = () => {
    setNumber(number + 1);
  };
  const itemreduce = () => {
    setNumber(number - 1);
  };

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

              <h5 className="font-semibold">{item.price}</h5>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    disabled={number === 1}
                    onClick={itemreduce}
                    className="bg-[#4D0610] px-2 rounded-2xl text-white"
                  >
                    -
                  </button>

                  <span>{number}</span>

                  <button
                    onClick={itemQuntity}
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
