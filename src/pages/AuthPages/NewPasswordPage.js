import login_image from "../../assets/images/login-image.png";
import styles from "./OtpPage.module.css";
import logo from "../../assets/images/logo.png";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import OTPInput, { ResendOTP } from "otp-input-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showMessage } from "../../store/shared_stateSlice";
import { changePassword } from "../../store/api/authApi";

const NewPasswordPage = () => {
  const [loader, setLoader] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const email = location?.state?.email;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      dispatch(showMessage("Both password should be same"));
    } else {
      if (password && confirmPassword) {
        setAuthLoading(true);
        setError(null);
        console.log(password);
        setAuthLoading(true);
        changePassword(id, password, email)
          .then((res) => {
            console.log(res);
            setAuthLoading(false);
            dispatch(showMessage(res.data.msg));
            navigate("/login");
          })
          .catch((err) => {
            dispatch(showMessage(err.response.data.message));
            setAuthLoading(false);
          });
      } else {
        setError("enter email address");
      }
    }
  };

  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
  }, []);

  return (
    <div className="flex">
      {/* side one  */}
      <div className="sm:w-1/2 w-full flex sm:mt-0 mt-20 flex-col items-center justify-center">
        {" "}
        {/* otp container  */}
        <form
          onSubmit={submit}
          className="flex flex-col justify-center mt-4 h-full w-[20rem]"
        >
          <div id="otp" className="">
            <h1 className="leading-[135%] mb-2 text-lg font-bold">
              Forgot Password
            </h1>
            <p className="text-[grey] text-sm leading-[135%]">
              Please enter your new password
            </p>
          </div>
          <div id="Email" className="mt-5">
            <p className="">New Password</p>
            <input
              type="password"
              name="password"
              min={8}
              max={20}
              className="w-full p-2"
              style={{
                border: "1px solid black",
                outline: "none",
              }}
            />
          </div>
          <div id="Email" className="mt-5">
            <p className="">Confirm Password</p>
            <input
              type="password"
              name="confirmPassword"
              min={8}
              max={20}
              className="w-full p-2"
              style={{
                border: "1px solid black",
                outline: "none",
              }}
            />
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

export default NewPasswordPage;
