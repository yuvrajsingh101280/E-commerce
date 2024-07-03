import { text } from "@fortawesome/fontawesome-svg-core";
import React, { useContext, useState } from "react";
import myContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB, storage } from "../../firebase/Firebase";
import Loader from "../../components/loader/Loader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // Product state

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: null,
    category: "",
    description: "",
    quantity: 1,

    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // add product funtion
  const addProductFunction = async () => {
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageUrl === null ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);

    try {
      // upload image to firebase storage

      const storageRef = ref(
        storage,
        `productImages/${product.productImageUrl.name}`
      );

      await uploadBytes(storageRef, product.productImageUrl);
      const imageUrl = await getDownloadURL(storageRef);

      // Add product details to firestore with image URl
      const productRef = collection(fireDB, "products");

      await addDoc(productRef, { ...product, productImageUrl: imageUrl });

      toast.success("product added successfully");

      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Add Product Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        {/* add product form */}
        <div className="add_product_form bg-blue-50 px-8 py-6 border border-blue-100  rounded-xl shadow-md">
          {/* Top heading  */}
          <div className="mb-5 text center text-2xl font-bold text-blue-500">
            <h2>Add Product</h2>
          </div>
          {/* Input one  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
              placeholder="Product Title"
              className="bg-blue-50 text-blue-300 border border-blue-200   px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300  "
            />
          </div>
          {/* Input two */}
          <div className="mb-3">
            <input
              type="number"
              placeholder="Product Price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              className="bg-blue-50 w-96 border border-blue-200 px-2 py-2 rounded-md placeholder-blue-300 outline-none text-blue-300"
            />
          </div>
          {/* Input three */}
          {/* 
          <div className="mb-3">
            <input
              type="text"
              placeholder="Product Image URL"
              className="bg-blue-50 w-96 border border-blue-200 px-2 py-2 rounded-md placeholder-blue-300 outline-none text-blue-300"
            />
          </div> */}
          <div className="mb-3">
            <h1 className="mb-2 font-bold bg-blue-100 px-2 py-2 text-lg rounded-md">
              Add Product image
            </h1>
            <input
              type="file"
              name="ProductImageUrl"
              placeholder="Add product image"
              // value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.files[0],
                });
              }}
              accept="image/*"
              className="bg-blue-50 w-96 border border-blue-200 px-2 py-2 rounded-md placeholder-blue-300 outline-none text-blue-300"
            />
          </div>
          {/* Input 4 */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
              required
              autoFocus
              className="w-full px-1 py-2 text-blue-300  bg-blue-50 border border-blue-200  rounded-md  outline-none"
            >
              <option disabled selected>
                Select Product Category
              </option> 
              {categoryList.map((value, index) => {
                const { name } = value;

                return (
                  <option
                    className="first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input 5 */}

          <div className="mb-3">
            <textarea
              name="description"
              id=""
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              placeholder=" Product Description "
              rows="5"
              className="w-full px-2 py-1 text-blue-300 bg-blue-50 border border-blue-200  rounded-md outline-none placeholder-blue-300"
            ></textarea>
          </div>

          {/* Add product Button */}

          <button
            type="button"
            className="bg-blue-500  hover:bg-blue-600  w-full text-center py-2 font-bold rounded-md"
            onClick={addProductFunction}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
