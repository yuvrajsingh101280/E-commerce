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
import Userdashboard from "./pages/user/Userdashboard.jsx";
import Admindashboard from "./pages/admin/Admindashboard.jsx";
import AddProductPage from "./pages/admin/AddProductPage.jsx";
import UpdateProductPage from "./pages/admin/UpdateProductPage.jsx";
import MyState from "./context/MyState.jsx";
import { Toaster } from "react-hot-toast";
import protectedRouteForUser from "./protectedRoute/protectedRouteForUser.jsx";
import ProtectedRouteForAdmin from "./protectedRoute/ProtectedRouteForAdmin.jsx";
import CategoryPage from "./pages/category/CategoryPage.jsx";

import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import { Analytics } from "@vercel/analytics/react";
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
        path: "productinfo/:id",
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
      {
        path: "user-dashboard",
        element: (
          <protectedRouteForUser>
            <Userdashboard />
          </protectedRouteForUser>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <ProtectedRouteForAdmin>
            <Admindashboard />
          </ProtectedRouteForAdmin>
        ),
      },
      {
        path: "addproduct",
        element: (
          <ProtectedRouteForAdmin>
            <AddProductPage />
          </ProtectedRouteForAdmin>
        ),
      },
      {
        path: "updateproduct/:id",
        element: (
          <ProtectedRouteForAdmin>
            <UpdateProductPage />
          </ProtectedRouteForAdmin>
        ),
      },
      {
        path: "/category/:categoryname",
        element: <CategoryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {" "}
    <Provider store={store}>
      {" "}
      <ThemeProvider>
        <MyState>
          <RouterProvider router={router} />
          <Analytics />
          <Toaster />
        </MyState>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
