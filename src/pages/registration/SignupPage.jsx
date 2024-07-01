import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
const SignupPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  // user Signup function

  const userSignupFunction = async () => {
    // validation

    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required buddy please fill it");
    }
    setLoading(true);

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
      // create user object

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // creater user reference

      const userReference = collection(fireDB, "user");

      // add the user details to the firebase

      addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });
      toast.success("bhai signed up successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* loader component */}
      {loading && <Loader />}
      {/* Login Form  */}
      <div className="login_Form bg-blue-50 px-1 lg:px-8 py-6 border border-blue-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-blue-500 ">
            Create your Account
          </h2>
        </div>
        {/* Input One  */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
          />
        </div>
        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({ ...userSignup, email: e.target.value });
            }}
          />
        </div>
        {/* Input Three  */}
        <div className="mb-5">
          <input
            type="password"
            placeholder="Password"
            className="bg-blue-50 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-200"
            value={userSignup.password}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                password: e.target.value,
              });
            }}
          />
        </div>
        {/* Signup Button  */}
        <div className="mb-5">
          <button
            onClick={userSignupFunction}
            type="button"
            className="bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            SignUp
          </button>
        </div>
        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-blue-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
