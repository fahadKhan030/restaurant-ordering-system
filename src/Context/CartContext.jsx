import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]);
  const [togglecart, settogglecart] = useState(false);

  useEffect(() => {
    console.log("Cart:", Cart);
  }, [Cart]);

  const addToCart = (item) => {
    const existingItem = Cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((CarItem) =>
          CarItem.id === item.id
            ? {
                ...CarItem,
                quantity: CarItem.quantity + 1,
              }
            : CarItem,
        ),
      );
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
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const calculateTotalPrice = () => {
    return Cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const togglec = () => {
    settogglecart((prev) => !prev);
    console.log(togglecart);
  };

  return (
    <CartContext.Provider
      value={{
        Cart,
        addToCart,
        removeItem,
        IncreaseQuantity,
        togglecart,
        decreaseQuantity,
        calculateTotalPrice,
        togglec,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
