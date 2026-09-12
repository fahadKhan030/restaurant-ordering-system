import React from "react";
import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <div className="">
      <Header />
      <Menu />
      <Cart />
    </div>
  );
};

export default App;
