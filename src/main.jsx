import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./Dashboard/DashBoard.jsx";
import CheckOutForm from "./components/Cart/CheckOutForm.jsx";
import OrderDashboard from "./Dashboard/OrdersDashboard.jsx";
import DashboardMenu from "./Dashboard/DashboardMenu.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "orders",
        element: <OrderDashboard />,
      },
      {
        path: "menu",
        element: <DashboardMenu />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckOutForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </CartProvider>,
);
