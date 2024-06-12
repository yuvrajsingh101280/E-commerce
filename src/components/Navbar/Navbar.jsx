import React from "react";
import Searchbar from "../searchbar/Searchbar";
import { Link } from "react-router-dom";
const Navbar = () => {
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
      <li>
        <Link to={"/signup"}>Signup</Link>
      </li>
      {/* User */}
      <li>
        <Link to={"/user-dashboard"}>Kamal</Link>
      </li>
      {/* Admin */}
      {/* <li>
            </li> */}
      {/* logout */}
      {/* <li>
            </li> */}
      {/* Cart */}
      <li>
        <Link to={"/cart"}></Link>
      </li>
    </ul>
  );
  return (
    <nav className="bg-blue-600 z-60 sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              E-Bharat
            </h2>
          </Link>
        </div>
        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
        {/* Search Bar  */}
        <Searchbar />
      </div>
    </nav>
  );
};

export default Navbar;
