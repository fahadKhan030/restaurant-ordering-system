import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { supabase } from "../../lib/supabase";

const CheckOutForm = () => {
  // Get cart data from CartContext
  const { Cart = [] } = useContext(CartContext);

  // Customer form state
  const [fromData, setFromData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Loading and message states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate cart subtotal
  const total = Cart.reduce((sum, item) => {
    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  // Handle customer input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFromData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit order to Supabase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Check empty cart
    if (Cart.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    // Check form values
    if (
      !fromData.name.trim() ||
      !fromData.phone.trim() ||
      !fromData.address.trim()
    ) {
      setMessage("Please fill in all customer details.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the Supabase database function
      const { data: orderId, error } = await supabase.rpc("place_order", {
        p_name: fromData.name.trim(),
        p_phone: fromData.phone.trim(),
        p_address: fromData.address.trim(),

        p_items: Cart.map((item) => ({
          menu_items_id: item.id,
          quantity: Number(item.quantity),
        })),
      });

      // Check for Supabase errors
      if (error) {
        throw error;
      }

      // Show successful order message
      console.log("Order created:", orderId);

      setMessage(`Order #${orderId} placed successfully!`);

      setOrderPlaced(true);

      // Empty customer form after successful order
      setFromData({
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error("Order submission failed:", error);

      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F3] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4D0610]">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Please fill in your details to confirm your order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Information */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#4D0610] mb-6">
              Customer Information
            </h2>

            {/* Full Name */}
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="name" className="font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={fromData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[#4D0610]"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="phone" className="font-medium text-gray-700">
                Phone Number
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={fromData.phone}
                onChange={handleInputChange}
                placeholder="03001234567"
                className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[#4D0610]"
                required
              />
            </div>

            {/* Delivery Address */}
            <div className="flex flex-col gap-2 mb-5">
              <label htmlFor="address" className="font-medium text-gray-700">
                Delivery Address
              </label>

              <textarea
                id="address"
                name="address"
                value={fromData.address}
                onChange={handleInputChange}
                placeholder="Enter your complete delivery address"
                rows={4}
                className="border border-gray-300 rounded-lg py-3 px-4 outline-none focus:ring-2 focus:ring-[#4D0610] resize-none"
                required
              />
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center border-t border-gray-200 pt-5 mt-6">
              <span className="text-lg font-semibold">Total Amount</span>

              <span className="text-xl font-bold text-[#4D0610]">
                Rs. {total.toLocaleString("en-PK")}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || Cart.length === 0 || orderPlaced}
              className="w-full bg-[#4D0610] text-white py-3 rounded-lg mt-6 font-semibold hover:bg-[#680918] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Placing Order..."
                : orderPlaced
                  ? "Order Placed"
                  : "Place Order"}
            </button>

            {/* Success / Error Message */}
            {message && (
              <p
                role="status"
                className={`mt-4 text-center font-medium ${
                  orderPlaced ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-2xl font-semibold text-[#4D0610] mb-6">
              Order Summary
            </h2>

            {Cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="flex flex-col gap-5">
                {Cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.Name || item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.Name || item.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.quantity} × Rs.{" "}
                          {Number(item.price).toLocaleString("en-PK")}
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-[#4D0610]">
                      Rs.{" "}
                      {(
                        Number(item.price) * Number(item.quantity)
                      ).toLocaleString("en-PK")}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Subtotal */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <span className="text-lg font-semibold">Total</span>

              <span className="text-xl font-bold text-[#4D0610]">
                Rs. {total.toLocaleString("en-PK")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
