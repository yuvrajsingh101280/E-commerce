import myContext from "./MyContext";
import { useState } from "react";
function MyState({ children }) {
  const [loading, setLoading] = useState(false);

  return (
    <myContext.Provider value={{ loading, setLoading }}>
      {children}
    </myContext.Provider>
  );
}
export default MyState;
