import login_image from "../../assets/images/login-image.png";
import styles from "./OtpPage.module.css";
import logo from "../../assets/images/logo.png";
import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../store/api/authApi";
import { useDispatch } from "react-redux";
import { showMessage } from "../../store/shared_stateSlice";

const OtpPage = () => {
  const [loader, setLoader] = useState(false);
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const email = location?.state?.email;
  const from = location?.state?.from;
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate(-1);
    }
    if (OTP.length === 6 && email) {
      verifyOtp(OTP, email)
        .then((res) => {
          if (res.status === 200) {
            dispatch(showMessage(res.data.msg));
            if (from && from === "forgot_password") {
              navigate(`/reset-password/${res.data.id}`, { state: { email } });
            } else if (from && from === "businessAccount") {
              navigate("/business-verification", {
                state: { userId: res.data.id },
              });
            } else {
              navigate("/login");
            }
          }
        })
        .catch((error) => {
          // setOTP("");
          setError(true);
          // setError(error.response.data.message);
          console.log(error.response.data.message);
        });
    } else {
      if (OTP.length > 0) {
        setError(false);
      }
    }
  }, [OTP]);

  const renderButton = (buttonProps) => {
    return (
      <button
        {...buttonProps}
        className="text-[grey] cursor-pointer hover:text-[#b0242f]  text-sm order-1"
      >
        {loader ? (
          <div className="flex row-start">
            <CircularProgress size={30} color="inherit" />
          </div>
        ) : (
          "Resend Email"
        )}
      </button>
    );
  };

  return (
    <div className="flex">
      {/* side one  */}
      <div className="sm:w-1/2 w-full flex sm:mt-0 mt-20 flex-col items-center justify-center">
        {" "}
        {/* otp container  */}
        <div className="flex flex-col justify-center mt-4 h-full w-[80%]">
          <div id="otp" className="">
            <h1 className="leading-[135%] mb-2 text-lg font-bold">
              Enter Code
            </h1>
            <p className="text-[grey] text-sm leading-[135%]">
              Please enter the 4-digit code sent to you at johndoe@gmail.com
            </p>
          </div>
          <div className="flex flex-col mt-5">
            <div>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
                // secure
                style={{
                  marginBottom: "15px",
                  display: "flex",
                }}
                inputStyles={{
                  border: error ? "1px solid red" : "1px solid #808080",
                }}
              />
              <p className="">
                Can’t find code? if you can’t see the email, check your spam
                folder or resend the email. If you are still having trouble
              </p>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <ResendOTP
                  timeInterval={false}
                  renderTime={(time) => {
                    return (
                      <div className="order-2 ml-2 text-sm font-[700]">
                        (0:{time})
                      </div>
                    );
                  }}
                  renderButton={renderButton}
                  style={{
                    color: "grey",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  className="mt-5"
                  onResendClick={() => {
                    // if (email) {
                    //   resendEmailHandler(email);
                    // }
                  }}
                />
              </div>

              <Link
                to="/forgot-password"
                className="mt-5 text-[#CF2D39] cursor-pointer hover:text-[#b0242f] text-sm"
              >
                Change email address
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* side two  */}
      <div className={`w-1/2 sm:block hidden h-[100vh]`}>
        <img src={login_image} alt="" className="h-full w-full" />
      </div>
    </div>
  );
};

export default OtpPage;
