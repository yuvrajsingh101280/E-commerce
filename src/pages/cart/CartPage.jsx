import { Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
  updateQuantity,
} from "../../redux/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import NoCartItem from "../../components/Nocartitem/NoCartItem";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Cart item deleted");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((preval, currValue) => preval + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((preval, currval) => preval + currval, 0);

  const user = JSON.parse(localStorage.getItem("users"));
  // console.log(user);

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = async () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All fields are required");
    }

    if (!user || !user.id) {
      return toast.error("User information is missing");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user?.email,
      userid: user?.id,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);

      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("Order placed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error placing order");
    }
  };

  return (
    <div className="mt-16">
      <Toaster
        position="top-center"
        toastOptions={{ style: { zIndex: 10000 } }}
      />
      {cartItems.length > 0 ? (
        <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
          <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8"
              >
                <h2 id="cart-heading" className="sr-only"></h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => {
                    const {
                      id,
                      price,
                      productImageUrl,
                      title,
                      quantity,
                      category,
                    } = item;
                    return (
                      <div key={index}>
                        <li className="flex py-6 sm:py-6">
                          <div className="flex-shrink-0">
                            <img
                              src={productImageUrl}
                              alt="Product"
                              className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                              loading="lazy"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                              <div>
                                <div className="flex justify-between">
                                  <h3 className="text-sm">
                                    <div className="font-semibold text-black -z-10">
                                      {title.slice(0, 20)}
                                    </div>
                                  </h3>
                                </div>
                                <div className="mt-1 flex text-sm">
                                  <p className="text-sm text-gray-500">
                                    {category}
                                  </p>
                                </div>
                                <div className="mt-1 flex items-end">
                                  <p className="text-xs font-medium text-blue-500">
                                    ₹{price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        <div className="mb-2 flex">
                          <div className="min-w-24 flex">
                            <button
                              onClick={() => handleDecrement(id)}
                              type="button"
                              className="h-7 w-7"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="mx-1 h-7 w-9 rounded-md border text-center"
                              value={quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                            <button
                              onClick={() => handleIncrement(id)}
                              type="button"
                              className="flex h-7 w-7 items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-6 flex text-sm">
                            <button
                              type="button"
                              className="flex items-center space-x-1 px-2 py-1 pl-0"
                            >
                              <Trash size={12} className="text-red-500" />
                              <span
                                onClick={() => deleteCart(item)}
                                className="text-xs font-medium text-red-500"
                              >
                                Remove
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ul>
              </section>
              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
              >
                <h2
                  id="summary-heading"
                  className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className="space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">
                        Price ({cartItemTotal} item)
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹{cartTotal}
                      </dd>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        Free
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹{cartTotal}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    <div className="flex gap-4 mb-6">
                      {user ? (
                        <BuyNowModal
                          addressInfo={addressInfo}
                          setAddressInfo={setAddressInfo}
                          buyNowFunction={buyNowFunction}
                        />
                      ) : (
                        <Navigate to="/login" replace={true} />
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      ) : (
        <NoCartItem />
      )}
    </div>
  );
};

export default CartPage;
