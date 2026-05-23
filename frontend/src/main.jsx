import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";

// pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import User from "./pages/user";
import ProductDetail from "./pages/product-detail";

import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Orders from "./pages/orders";
import OrderDetail from "./pages/order-detail";

// auth context
import { AuthWrapper } from "./components/context/auth.context";

// optional: nếu bạn chưa có thì có thể tự tạo
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");
  return token ? children : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        <App />
      </AuthWrapper>
    ),
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      { path: "products/:id", element: <ProductDetail /> },

      // protected routes
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);