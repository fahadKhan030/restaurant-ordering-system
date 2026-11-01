import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import cross from "../../assets/cross.png";
import { CartContext } from "../../Context/CartContext";

const CheckOutForm = () => {
  const [fromData, setFromData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const { Cart } = useContext(CartContext);
  // console.log("Cart in CheckOutForm:", Cart);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // First, check the submitted data
    console.log("Customer Details:", fromData);
    console.log("Ordered Items:", Cart);

    // Clear the inputs
    setFromData({
      name: "",
      phone: "",
      address: "",
    });
  };

  console.log("fromData:", fromData);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <h3 className="text-3xl font-semibold">Checkout</h3>
        <p>please fill in your details to confirm your order</p>
      </div>
      <div className="flex gap-5">
        <form className="bg-white" onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold py-3">Customer Information</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              Full Name
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              name="name"
              value={fromData.name}
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
              onChange={handleInputChange}
              name="phone"
              value={fromData.phone}
              placeholder="Enter your phone number"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="text" className="font-medium">
              Delivery Address
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              name="address"
              value={fromData.address}
              placeholder="Enter your delivery address"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full mt-4 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Place Order
          </button>
        </form>
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
