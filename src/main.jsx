import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import NoPage from "./pages/Nopage/NoPage.jsx";
import ProductInfo from "./pages/ProductInfo/ProductInfo.jsx";
import ScrollTop from "./components/ScrollTop/ScrollTop.jsx";
import CartPage from "./pages/cart/CartPage.jsx";
import AllProduct from "./pages/AllProduct/AllProduct.jsx";
import LoginPage from "./pages/registration/LoginPage.jsx";
import SignupPage from "./pages/registration/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollTop />
        <Layout />
      </>
    ),
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <NoPage />,
      },
      {
        path: "productinfo",
        element: <ProductInfo />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "allproduct",
        element: <AllProduct />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
