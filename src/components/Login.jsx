import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Header from "./Header";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, setsignin] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const [isShopOwner, setIsShopOwner] = useState(false);

  const email = useRef(null);
  const password = useRef(null);
  const phonenumber = useRef(null);
  const FirstName = useRef(null);
  const LastName = useRef(null);

  const togglesignin = () => {
    setsignin(!signin);
    seterrorMessage(null);
  };

  // ✅ LOGIN
  const handlelogin = async () => {
    const emailId = email.current.value;
    const Password = password.current.value;

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, Password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      res.data.isShopOwner === true
        ? navigate("/sellershopview")
        : navigate("/");
    } catch (err) {
      seterrorMessage(err?.response?.data || "Something went wrong");
    }
  };

  // ✅ SIGNUP
  const handlesignup = async () => {
    const emailId = email.current.value;
    const Password = password.current.value;

    try {
      await axios.post(
        BASE_URL + "/signup",
        {
          FirstName: FirstName.current.value,
          LastName: LastName.current.value,
          emailId,
          Password,
          PhoneNumber: phonenumber.current.value,
          isShopOwner,
        },
        { withCredentials: true }
      );

      navigate("/profile");
    } catch (err) {
      seterrorMessage(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-slate-900 to-slate-800 px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center">
            {signin ? "Sign In" : "Create Account"}
          </h2>

          {/* SIGNUP FIELDS */}
          {!signin && (
            <>
              <input
                ref={phonenumber}
                type="text"
                placeholder="Mobile"
                className="w-full p-3 rounded-lg text-black"
              />

              <input
                ref={FirstName}
                type="text"
                placeholder="First Name"
                className="w-full p-3 rounded-lg text-black"
              />

              <input
                ref={LastName}
                type="text"
                placeholder="Last Name"
                className="w-full p-3 rounded-lg text-black"
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isShopOwner}
                  onChange={(e) => setIsShopOwner(e.target.checked)}
                />
                Are you a shop owner?
              </label>
            </>
          )}

          {/* EMAIL */}
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="w-full p-3 rounded-lg text-black"
          />

          {/* PASSWORD */}
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg text-black"
          />

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <p className="text-red-400 font-semibold text-sm">
              {errorMessage}
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={signin ? handlelogin : handlesignup}
            className="w-full p-3 bg-red-600 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            {signin ? "SIGN IN" : "SIGN UP"}
          </button>

          {/* TOGGLE */}
          <p
            className="text-center text-sm cursor-pointer hover:underline"
            onClick={togglesignin}
          >
            {signin
              ? "New here? Create an account"
              : "Already registered? Sign In"}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
