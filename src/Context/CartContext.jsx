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

  const removeItem = (item) => {
    setCart(Cart.filter((cartitem) => cartitem.id !== item.id));
  };

  const IncreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{ Cart, addToCart, removeItem, IncreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
