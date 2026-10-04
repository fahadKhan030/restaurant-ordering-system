import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Romove from "../../assets/Remove.png";
import CheckOutForm from "./CheckOutForm";
import { NavLink } from "react-router";
import emptycart from "../../assets/emptycart.png";

const Cart = () => {
  const [toggleCheckOutFrom, setToggleCheckOutFrom] = useState();
  const {
    Cart,
    removeItem,
    IncreaseQuantity,
    decreaseQuantity,
    togglecart,
    togglec,
    calculateTotalPrice,
  } = useContext(CartContext);

  const togglfrom = () => {
    setToggleCheckOutFrom((prevtoggleCheckOutFrom) => !toggleCheckOutFrom);
    console.log(toggleCheckOutFrom);
  };

  return (
    <div
      className={`fixed flex flex-col items-center justify-between overflow-y-auto  top-22 p-2 bg-white duration-150 rounded-xl h-[80vh]  w-[350px] ${
        togglecart ? "right-1" : "-right-100"
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          <button></button>
          <h4 className="text-2xl font-semibold">Cart</h4>
          <div></div>
        </div>

        {Cart.length === 0 ? (
          <div className="flex flex-col h-full items-center justify-center text-center text-gray-500 mx-2 ">
            <img src={emptycart} alt="" className="h-30" />
            <p>
              your Cart is empty back to{" "}
              <button onClick={togglec} className="cursor-pointer underline">
                Menu
              </button>
            </p>
          </div>
        ) : (
          Cart.map((item) => {
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
                    <p className="text-[13px] text-gray-600">
                      {item.description}
                    </p>
                  </div>

                  <h5 className="font-semibold">
                    {item.price * item.quantity}
                  </h5>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-[#4D0610] hover:cursor-pointer px-2 rounded-2xl text-white"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => IncreaseQuantity(item.id)}
                        className="bg-[#4D0610] px-2 rounded-2xl hover:cursor-pointer text-white"
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
          })
        )}
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className=" px-4 ">
          <h2 className="flex items-center justify-between w-full font-semibold text-xl">
            <p>Sub Total</p>
            <span>${calculateTotalPrice()}</span>
          </h2>
          <span className="flex items-center justify-between w-full border-b-1 border-dotted py-2">
            <p>delivery fee</p>
            <span>10</span>
          </span>
          <h2 className="flex items-center justify-between w-full font-bold text-xl">
            <p>Total</p>
            <span>${calculateTotalPrice() + 10}</span>
          </h2>
        </div>

        {toggleCheckOutFrom && <CheckOutForm />}
        <NavLink
          to="/Checkout"
          // onClick={togglfrom}
          className="w-full text-center bg-buttons p-2 rounded-full mt-3 font-semibold hover:cursor-pointer"
        >
          Proceed to Checkout →
        </NavLink>
      </div>
    </div>
  );
};

export default Cart;
