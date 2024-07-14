import React from "react";

const NoCartItem = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 text-center">
        OOPS!! Your cart is empty
      </h1>
      <img
        src="/images/nocart.png"
        alt="No Cart"
        className="w-2/3 lg:w-1/2 max-w-xs lg:max-w-md"
      />
    </div>
  );
};

export default NoCartItem;
