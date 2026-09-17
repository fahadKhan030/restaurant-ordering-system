import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainDashboard from "./Dashboard/MainDashboard.jsx";
// import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <MainDashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </CartProvider>,
);
