import {
  QuerySnapshot,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import myContext from "./MyContext";
import { useEffect, useState } from "react";
import { fireDB } from "../firebase/Firebase";

function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  const [getAllProduct, setgetAllProduct] = useState([]);

  // Get all product function

  const getAllProductFunction = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });

        setgetAllProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductFunction();
  }, []);
  return (
    <myContext.Provider
      value={{ loading, setLoading, getAllProduct, getAllProductFunction }}
    >
      {children}
    </myContext.Provider>
  );
}
export default MyState;
