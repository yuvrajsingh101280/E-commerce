import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [userlogin, setUserlogin] = useState({
    email: "",
    password: "",
  });
  // show and hide password
  const dispatch = useDispatch();
  const [showpassword, setshowpassword] = useState(false);

  const userLoginFunction = async () => {
    if (userlogin.email === "" || userlogin.password === "") {
      toast.error("All Fields are required");
      return;
    }
    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userlogin.email,
        userlogin.password
      );

      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users.user.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let user;
        querySnapshot.forEach((doc) => (user = doc.data()));
        if (user) {
          localStorage.setItem("users", JSON.stringify(user));


          setUserlogin({
            email: "",
            password: "",
          });
          toast.success("User login successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        } else {
          toast.error("User not found");
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="login_Form bg-blue-50 px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-blue-500 ">
            Login
          </h2>
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            value={userlogin.email}
            onChange={(e) => {
              setUserlogin({
                ...userlogin,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-5">
          <input
            type={showpassword ? "text" : "password"}
            placeholder="Password"
            className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            value={userlogin.password}
            onChange={(e) => {
              setUserlogin({
                ...userlogin,
                password: e.target.value,
              });
            }}
          />
        </div>

        <div className="mb-5 flex gap-3">
          <input
            type="checkbox"
            id="showpassword"
            className="border border-blue-300"
            onChange={() => setshowpassword(!showpassword)}
          />
          <label htmlFor="showpassword">
            {showpassword ? "Hide password" : "Show password"}
          </label>
        </div>

        <div className="mb-5">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md"
            onClick={userLoginFunction}
          >
            Login
          </button>
        </div>
        <div>
          <h2 className="text-black">
            Don't have an account{" "}
            <Link className="text-blue-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
