import React from "react";
import Searchbar from "../searchbar/Searchbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
// import { clearCart } from "../../redux/cartSlice";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // logout function
  const logout = () => {
    localStorage.clear("user");
    // dispatch(clearCart());
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const navList = (
    <ul className="flex space-x-5 text-white font-medium text-md px-5 ">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      {/* All Product */}
      <li>
        <Link to={"/allproduct"}>All Product</Link>
      </li>
      {/* Signup */}
      {!user ? (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}

      {/* Login */}
      {!user ? (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link to={"/user-dashboard"}>{user?.name}</Link>
        </li>
      )}
      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admin-dashboard"}>{user?.name}</Link>
        </li>
      )}
      {/* Logout */}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          Logout
        </li>
      )}
      {/* Cart */}
      <li className="relative">
        <div className="cursor-pointer" onClick={handleCartClick}>
          <ShoppingCart />
        </div>
        {user ? (
          <div className="absolute bg-white text-black bottom-2 left-6 text-xs sm:text-sm rounded-full w-5 h-5 sm:w-8 sm:h-8 flex items-center justify-center">
            {cartItems.length}
          </div>
        ) : (
          ""
        )}
      </li>
    </ul>
  );

  return (
    <nav className="bg-blue-600 z-50 sticky top-0">
      {/* main */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-white text-2xl text-center">
              E-Bharat
            </h2>
          </Link>
        </div>
        {/* right */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
        {/* Search Bar */}
        <Searchbar />
      </div>
    </nav>
  );
};

export default Navbar;
