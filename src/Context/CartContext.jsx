import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);

  useEffect(() => {
    console.log("Cart:", Cart);
  }, [Cart]);

  const addToCart = (item) => {
    const existingItem = Cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      alert("items are in cart");
    } else {
      setCart([
        ...Cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <CartContext.Provider value={{ Cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
