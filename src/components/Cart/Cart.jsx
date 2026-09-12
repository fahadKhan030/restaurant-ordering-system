import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";

const Cart = () => {
  const { Cart } = useContext(CartContext);

  return (
    <div>
      <h2>this the cart itmes </h2>
      {Cart.map((item) => {
        return (
          <article key={item.id}>
            <div>
              <img src={item.image_url} alt={item.Name} />
            </div>

            <div>
              <div>
                <h5 className="text-xl font-semibold">{item.Name}</h5>
                <p>{item.description}</p>
              </div>

              <h5 className="font-semibold">{item.price}</h5>

              <div>
                <div className="flex gap-2">
                  <button className="bg-[#4D0610] px-2 rounded-2xl text-white">
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button className="bg-[#4D0610] px-2 rounded-2xl text-white">
                    +
                  </button>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Cart;
