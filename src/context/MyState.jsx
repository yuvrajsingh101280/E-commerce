import myContext from "./MyContext";
import { useState } from "react";

function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  const [getAllProduct, setgetAllProduct] = useState([]);

  // Get all product function

const getAllProductFunction = async ()_>{
}


  return (
    <myContext.Provider value={{ loading, setLoading }}>
      {children}
    </myContext.Provider>
  );
}
export default MyState;
