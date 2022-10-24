import { Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import logo from "../../assets/images/logo.png";
import { BsEyeFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import login_image from "../../assets/images/login-image.png";
import { signupUser, userBusinessSignup } from "../../store/api/authApi";
import { showMessage } from "../../store/shared_stateSlice";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  // const [value, setValue] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!!user) {
  //     navigate("/");
  //   }
  // }, [user]);

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    if (isBusiness) {
      userBusinessSignup({
        userName: data.userName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        isBusiness,
        businessRegistrationNumber: data.businessregistrationNumber,
      })
        .then((res) => {
          console.log("signup res", res);
          setLoading(false);
          if (res.data.success) {
            dispatch(showMessage(res.data.msg));
            navigate("/verify-otp", {
              state: { email: data.email, from: "businessAccount" },
            });
          }
        })
        .catch((err) => {
          console.log("signup err", err);
          dispatch(showMessage(err.response.data.message));
          setLoading(false);
        });
    } else {
      signupUser({
        userName: data.userName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        isBusiness,
      })
        .then((res) => {
          console.log("signup res", res);
          setLoading(false);
          if (res.data.success) {
            dispatch(showMessage(res.data.msg));
            navigate("/verify-otp", { state: { email: data.email } });
          }
        })
        .catch((err) => {
          console.log("signup err", err);
          dispatch(showMessage(err.response.data.message));
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <div className={`${styles.login_container}`}>
        {/* side one start ------------------------------------------------------------------*/}
        <div className={`${styles.side}`}>
          <div className="flex flex-col justify-center h-[100vh] 2xl:overflow-auto xl:overflow-auto  lg:overflow-scroll">
            {/* logo image start ------------------------------------------------- */}
            {/* <div className="flex justify-center lg:mt-[240px] xl:mt-0 2xl:mt-0"> */}

            <div className="flex justify-center mt-0 lg:mt-[10rem] md:mt-[10rem] xl:mt-[10rem] 2xl:mt-0">
              <img
                src={logo}
                style={{ width: "193px", height: "67px" }}
                className=" mt-[35px] sm:mt-[52px] md:mt-[61px] lg:mt-[3.5rem] xl:mt-[3.5rem] 2xl:mt-[3.5rem]"
                alt="boon4 logo"
              />
            </div>
            {/* logo image end ------------------------------------------------- */}
            {/* //////////////////////////////////////////////////////////////// */}
            {/* form section  start ---------------------------------------------*/}
            <div
              id="form-container"
              // className="lg:mt-7 xl:mt-2 2xl:mt-3 flex justify-center w-full"
              className="flex justify-center w-full"
            >
              <div className="sm:w-full max-w-[21.688rem]">
                <p className="text-[1.75rem] font-[700] mb-3">SignUp</p>
                {/* form_inputs section start-----------------*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div id="userName">
                    <p>User Name</p>
                    <input
                      type="text"
                      {...register("userName", { required: "required" })}
                      className="w-full p-2"
                      style={{
                        border: "1px solid black",
                        outline: "none",
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="userName"
                      render={() => (
                        <Alert severity="error">
                          {errors.userName?.message}
                        </Alert>
                      )}
                    />
                  </div>
                  <div id="Email" className="mt-2">
                    <p>Email Address</p>
                    <input
                      type="email"
                      {...register("email", { required: "email is required" })}
                      className="w-full p-2"
                      style={{
                        border: "1px solid black",
                        outline: "none",
                      }}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={() => (
                        <Alert severity="error">{errors.email?.message}</Alert>
                      )}
                    />
                  </div>
                  <div className="Password mt-2">
                    <p>Password</p>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("password", { required: "required" })}
                        className="w-full p-2"
                        style={{
                          border: "1px solid black",
                          outline: "none",
                        }}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="password"
                        render={() => (
                          <Alert severity="error">
                            {errors.password?.message}
                          </Alert>
                        )}
                      />

                      <div className="absolute right-4 md:top-3 sm:top-3 top-3">
                        <BsEyeFill />
                      </div>
                    </div>
                  </div>
                  <div className="phone_number mt-2">
                    <p>Phone Number</p>
                    <div className="">
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "phone number is required" }}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            // placeholder="Enter phone number"
                            value={value}
                            onChange={onChange}
                            error={
                              value
                                ? isValidPhoneNumber(value)
                                  ? undefined
                                  : "Invalid phone number"
                                : "Phone number required"
                            }
                            numberInputProps={{
                              style: {
                                border: "1px solid black",
                                padding: "0.5rem",
                              },
                            }}
                            countrySelectProps={{
                              style: {
                                border: "1px solid black",
                                padding: "0.5rem",
                              },
                            }}
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="phone"
                        render={() => (
                          <Alert severity="error">
                            {errors.phone?.message}
                          </Alert>
                        )}
                      />
                    </div>
                  </div>
                  <p className="text-slate-500 mt-2 font-[400] text-[14px]">
                    We’ll send a verification code via SMS to confirm your
                    mobile number
                  </p>
                  {isBusiness && (
                    <div id="business_registration_number" className="mt-2">
                      <p>Business registration number</p>
                      <input
                        type="text"
                        {...register("businessregistrationNumber", {
                          required: "required",
                          minLength: {
                            value: 5,
                            message: "min length should be 25",
                          },
                        })}
                        className="w-full p-2"
                        style={{
                          border: "1px solid black",
                          outline: "none",
                        }}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="businessregistrationNumber"
                        render={() => (
                          <Alert severity="error">
                            {errors.businessregistrationNumber?.message}
                          </Alert>
                        )}
                      />
                    </div>
                  )}
                  <div className="flex items-center my-4">
                    <input
                      id="isBusiness"
                      type="checkbox"
                      onChange={(e) => setIsBusiness(e.target.checked)}
                      value={isBusiness}
                      className="w-4 h-4 accent-[#CF2D39]"
                    />
                    <label
                      htmlFor="isBusiness"
                      className="ml-2 text-slate-500 font-[400] text-[14px]"
                    >
                      Is this a business account?
                    </label>
                  </div>{" "}
                  <div className="flex items-center my-4">
                    <Controller
                      name="terms_conditions"
                      control={control}
                      rules={{
                        required: "terms and condtion should be checked",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <>
                          <input
                            id="terms_conditions"
                            type="checkbox"
                            onChange={onChange}
                            value={value}
                            defaultValue={false}
                            // {...register("terms_conditions", {
                            //   required: "agree terms and conditions first",
                            // })}
                            className="w-4 h-4 accent-[#CF2D39]"
                          />
                          <label
                            htmlFor="terms_conditions"
                            className="ml-2 text-slate-500 font-[400] text-[14px]"
                          >
                            I am agree with your{" "}
                            <Link
                              to="/terms-conditions"
                              className="text-[#CF2D39] cursor-pointer hover:text-[#b0242f] inline"
                            >
                              terms and conditions
                            </Link>
                          </label>
                        </>
                      )}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="terms_conditions"
                    render={() => (
                      <Alert severity="error">
                        {errors.terms_conditions?.message}
                      </Alert>
                    )}
                  />
                  <div id="Buttons" className="mt-5">
                    <button
                      type="submit"
                      value="submit"
                      className={`${
                        loading && "bg-[#dad3d3] hover:bg-[#dad3d3]"
                      } relative shadow-md w-full p-2 bg-[#CF2D39] text-white hover:bg-[#b0242f]`}
                    >
                      Continue
                      {loading && (
                        <div className="absolute top-[30%] left-[47%]">
                          <CircularProgress size={"20px"} />
                        </div>
                      )}
                    </button>
                    <div
                      id="or"
                      className="flex justify-between items-center my-4"
                    >
                      <Divider color="#c6c6c6" width="37%" className="" />
                      <p className="text-[#B0B0B0]">or</p>
                      <Divider color="#c6c6c6" width="37%" />
                    </div>
                    <div id="social" className="mb-8">
                      <div className="">
                        <Button
                          color="secondary"
                          variant="outlined"
                          className="w-full"
                          startIcon={<FcGoogle />}
                        >
                          Continue with google
                        </Button>
                      </div>
                      <div className="mt-2">
                        <Button
                          color="secondary"
                          variant="outlined"
                          className="w-full"
                          startIcon={<BsFacebook color="blue" />}
                        >
                          Continue with facebook
                        </Button>
                      </div>
                      <p
                        className="mb-8 mt-2 text-slate-500
                    "
                      >
                        Already have an account ?{" "}
                        <Link
                          to="/login"
                          className="text-[#CF2D39] cursor-pointer hover:text-[#b0242f] inline"
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
                {/* form_inputs section end-----------------*/}
              </div>
            </div>
          </div>
        </div>
        {/* form section end----------------------------------------------------------------- */}
        {/* ///////////////////////////////////////////////////////////////////////////////// */}
        {/* side one end ---------------------------------------------------------------------- */}
        {/* /////////////////////////////////////////////////////////////////////////////////////////// */}
        {/* side two start------------------------------------------------------------------------*/}
        <div className={`${styles.side} ${styles.side2}`}>
          <img
            src={login_image}
            alt="login_image"
            className="w-full h-[100vh]"
          />
        </div>
        {/* side two end ---------------------------------------------------------------------------- */}
      </div>
    </div>
  );
};

export default SignupPage;

// import { Typography } from "@mui/material";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginService } from "../../store/AuthSlice";
// import styles from "./SignUpPage.module.css";
// import logo from "../../assets/images/logo.png";
// import Box from "@mui/material/Box";
// import { BsEyeFill } from "react-icons/bs";

// const SignUpPage = () => {
//   return (
//     <div>
//       <div className={`${styles.login_container}`}>
//         <div className={`${styles.side}`}>
//           <div className="flex justify-center">
//             <img
//               src={logo}
//               style={{ width: "193px", height: "67px" }}
//               className="sm:mt-[5.938rem] mt-[3rem]"
//               alt="boon4 logo"
//             />
//           </div>
//           <div id="form-container" className="mt-7 flex justify-center w-full">
//             <div className="sm:w-full max-w-[21.688rem]">
//               <Typography
//                 // lineHeight={"2.125rem"}
//                 fontSize="1.75rem"
//                 marginBottom="1rem"
//                 fontWeight="700"
//               >
//                 SignUp
//               </Typography>
//               <form>
//                 <div>
//                   <Typography lineHeight={"2.125rem"} fontSize="0.875rem">
//                     Full Name
//                   </Typography>
//                   <input
//                     type="text"
//                     name=""
//                     id=""
//                     className="w-full mb-[0.675rem] md:p-[0.575] sm:p-[0.775rem] p-[0.675rem]"
//                     style={{
//                       border: "1px solid black",
//                       outline: "none",
//                     }}
//                   />
//                 </div>
//                 <div>
//                   <Typography lineHeight={"2.125rem"} fontSize="0.875rem">
//                     Email Address
//                   </Typography>
//                   <input
//                     type="email"
//                     name=""
//                     id=""
//                     className="w-full mb-[0.675rem] md:p-[0.575] sm:p-[0.775rem] p-[0.675rem]"
//                     style={{
//                       border: "1px solid black",
//                       outline: "none",
//                     }}
//                   />
//                 </div>
//                 <div className="">
//                   <Typography lineHeight={"2.125rem"} fontSize="0.875rem">
//                     Password
//                   </Typography>
//                   <div className="relative">
//                     <input
//                       type="password"
//                       name=""
//                       id=""
//                       className="w-full mb-[0.675rem] md:p-[0.575] sm:p-[0.775rem] p-[0.675rem] "
//                       style={{
//                         border: "1px solid black",
//                         outline: "none",
//                       }}
//                     />
//                     <div className="absolute right-4 md:top-4 sm:top-5 top-4">
//                       <BsEyeFill />
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className={`${styles.side} ${styles.side2}`}></div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
