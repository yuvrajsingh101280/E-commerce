import { useContext } from "react";
import { useNavigate } from "react-router";
import myContext from "../../context/MyContext";

// const ProductData = [
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 150,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image:
//       "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
//     title: "Kaushalam kalash Copper Pot",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image:
//       "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 130,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     image:
//       "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 150,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image:
//       "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
//     title: "Kaushalam kalash Copper Pot",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image:
//       "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 130,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     image:
//       "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
// ];

const HomepageProducCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);

  const { getAllProduct } = context;

  return (
    <div className=" mt-12">
      {/* heading */}
      <div className="">
        <h1 className="text-center mb-5 text-2xl font-semibold">
          Best Selling Product
        </h1>
      </div>

      {/* main section */}

      <section className="text-gray-600 ">
        <div className="container  mx-auto px-5 py-5">
          <div className="flex flex-wrap -m-4">
            {getAllProduct.slice(0, 8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;

              return (
                <div key={index} className="p-4 w-full md:w-1/4">
                  <div className="h-full  border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer ">
                    <img
                      src={productImageUrl}
                      alt=""
                      className="lg:h-80 h-90 w-full"
                      onClick={() => navigate(`/productinfo/${id}`)}
                    />

                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        E-bharat
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {title.substring(0, 25)}
                      </h1>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        ₹{price}
                      </h1>
                    </div>

                    <div className="flex justify-center">
                      <button className="bg-blue-500 mx-auto hover:bg-blue-400 transition-all  w-60 mb-6 text-white py-[4px] rounded-lg font-bold">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomepageProducCard;
