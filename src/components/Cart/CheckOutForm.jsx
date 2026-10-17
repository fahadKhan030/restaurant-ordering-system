import React, { useContext } from "react";
import { NavLink } from "react-router";
import cross from "../../assets/cross.png";
import { CartContext } from "../../Context/CartContext";

const CheckOutForm = () => {
  const { Cart } = useContext(CartContext);
  console.log("Cart in CheckOutForm:", Cart);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h3 className="text-3xl font-semibold">Checkout</h3>
        <p>please fill in your details to confirm your order</p>
      </div>
      <div className="flex gap-5">
        <from className="bg-white">
          <h3 className="text-2xl font-semibold py-3">Customer Information</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              delivery Address
            </label>
            <input
              type="address"
              placeholder="Enter your delivery address"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="bg-blue-500 w-full mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Place Order
          </button>
        </from>
        <div clasName="">
          <h3>Order Summary</h3>
          <article className="flex flex-col gap-2">
            {Cart.map((item) => (
              <div
                key={item.id}
                className="flex w-[330px] border broder-1  border-gray-500 rounded-2xl   justify-between items-center"
              >
                <div className="flex w-full justify-between items-center pr-3">
                  <div className="flex gap-2 items-center">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-semibold">{item.Name}</h4>
                      <div>Quantity: {item.quantity}</div>
                    </div>
                  </div>

                  <h3 className="font-semibold">${item.price.toFixed(2)}</h3>
                </div>
              </div>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
