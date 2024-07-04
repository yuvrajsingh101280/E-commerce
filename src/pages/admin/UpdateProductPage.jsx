import React, { useContext } from "react";
import { useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate, useParams } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];
const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct } = context;

  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id);

  const [product, setproduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),

    date: new Date().toLocaleString("en-us", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login form */}
        <div className="bg-blue-50  px-8 py-6 border border-blue-100 rounded-xl shadow-md">
          {/* top heading */}
          <div className="mb-5">
            <h2>Update Product</h2>
          </div>
          {/* Input one */}

          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="bg-blue-50 border text-blue-300 border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300"
            />
          </div>

          {/* input two  */}

          <div className="mb-3">
            <input
              type="text"
              name="price"
              placeholder="Product Price"
              className="bg-blue-50 border text-blue-300  border-blue-200 px-2 py-2 w-96 rounded-md outline-none  placeholder-blue-300"
            />
          </div>

          {/* Input three */}

          <div className="mb-3">
            <input
              type="text"
              name="ProductImageUrl"
              placeholder="Product Image Url"
              className="bg-blue-50 border text-blue-300  border-blue-200 px-2 py-2 w-96 rounded-md outline-none  placeholder-blue-300"
            />
          </div>

          {/* Input four */}

          <div className="mb-3">
            <select
              name=""
              id=""
              className="w-96 px-2 py-2 text-blue-300  bg-blue-50  border border-blue-200 rounded-md outline-none "
            >
              <option disabled selected>
                Select Product Category
              </option>

              {categoryList.map((item, index) => {
                const { name } = item;
                return (
                  <option key={index} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Input Five */}
          <div className="mb-3">
            <textarea
              name="description"
              id=""
              placeholder="Product Description"
              rows="5"
              className="w-full px-2 py-1 text-blue-300 border border-blue-200  rounded-md outline-none placeholder-blue-300"
            ></textarea>
          </div>

          {/* updaet Product button */}
          <div className="mb-3">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white text-center py-2 font-bold px-2 rounded-md"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductPage;
