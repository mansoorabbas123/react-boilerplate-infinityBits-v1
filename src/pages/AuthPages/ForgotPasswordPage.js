import login_image from "../../assets/images/login-image.png";
import React from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { sendOtp } from "../../store/api/authApi";
import { useDispatch } from "react-redux";
import { showMessage } from "../../store/shared_stateSlice";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (e.target.email.value) {
      setAuthLoading(true);
      setError(null);
      console.log(e.target.email.value);
      sendOtp(e.target.email.value)
        .then((res) => {
          console.log("sendOtp res", res);
          dispatch(showMessage(res.data.msg));
          setAuthLoading(false);
          navigate("/verify-otp", {
            state: { email: e.target.email.value, from: "forgot_password" },
          });
        })
        .catch((err) => {
          setAuthLoading(false);
          dispatch(showMessage(err.response.data.message));
        });
    } else {
      setError("enter email address");
    }
  };

  return (
    <div className="flex">
      {/* side one  */}
      <div className="sm:w-1/2 w-full flex sm:mt-0 mt-20 flex-col items-center justify-center">
        {" "}
        <form
          onSubmit={submit}
          className="flex flex-col justify-center mt-4 h-full w-[20rem]"
        >
          <div id="otp" className="">
            <h1 className="leading-[135%] mb-2 text-lg font-bold">
              Enter Your Email
            </h1>
            <p className="text-[grey] text-sm leading-[135%]">
              Please enter your email. We will send you a code to reset your
              password.
            </p>
          </div>
          <div id="Email" className="mt-5">
            <p className="">Email Address</p>
            <input
              type="email"
              id="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              className="w-full p-2"
              style={{
                border: "1px solid black",
                outline: "none",
              }}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
          <div id="Buttons" className="mt-5">
            <button
              type="submit"
              className={`${authLoading && "bg-[#dad3d3] hover:bg-[#dad3d3]"}
                 relative shadow-md w-full p-2 bg-[#CF2D39] text-white hover:bg-[#b0242f]`}
            >
              Reset Password
              {authLoading && (
                <div className="absolute top-[30%] left-[47%]">
                  <CircularProgress size={"20px"} />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
      {/* side two  */}
      <div className={`w-1/2 sm:block hidden h-[100vh]`}>
        <img src={login_image} alt="" className="h-full w-full" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
