import { Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../store/AuthSlice";
import styles from "./LoginPage.module.css";
import logo from "../../assets/images/logo.png";
import Box from "@mui/material/Box";
import login_image from "../../assets/images/login-image.png";
import { BsEyeFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Alert from "@mui/material/Alert";
import { showMessage } from "../../store/shared_stateSlice";
import CircularProgress from "@mui/material/CircularProgress";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { user, authError, authLoading } = useSelector(({ auth }) => auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!!user) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginService(data));
  };
  return (
    <div>
      <div className={`${styles.login_container}`}>
        {/* side one start ------------------------------------------------------------------*/}
        <div className={`${styles.side} flex flex-col justify-center`}>
          {/* logo image start ------------------------------------------------- */}
          <div className="flex justify-center">
            <img
              src={logo}
              style={{ width: "193px", height: "67px" }}
              className=" mt-[41px] sm:mt-[132px] md:mt-[42px] lg:mt-[3.5rem] xl:mt-2 2xl:mt-2"
              alt="boon4 logo"
            />
          </div>
          {/* logo image end ------------------------------------------------- */}
          {/* //////////////////////////////////////////////////////////////// */}
          {/* form section  start ---------------------------------------------*/}
          <div id="form-container" className="mt-7 flex justify-center w-full">
            <div className="sm:w-full max-w-[21.688rem]">
              <p
                className="text-[1.75rem] font-[700] mb-3"
                // fontWeight="700"
              >
                SignIn
              </p>
              {/* form_inputs section start-----------------*/}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div id="Email">
                  <p>Email Address</p>
                  <input
                    type="email"
                    id=""
                    {...register("email", { required: "required" })}
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
                      <Alert severity="error">{errors.email?.message}</Alert>
                    )}
                  />
                </div>
                <div className="Password mt-2">
                  <p>Password</p>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", { required: "required" })}
                      id=""
                      // className="w-full mb-[0.675rem] md:p-[0.575] sm:p-[0.775rem] p-[0.675rem] "
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

                    <div
                      className="absolute right-4 md:top-3 sm:top-3 top-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <BsEyeFill />
                    </div>
                  </div>
                </div>
                <div id="forget_password" className="w-full flex justify-end">
                  <Link
                    to={"/forgot-password"}
                    className="text-[#CF2D39] mt-2 font-[600] underline hover:text-[#bf2733] cursor-pointer"
                  >
                    Forgot Password
                  </Link>
                </div>
                <div id="Buttons" className="mt-5">
                  <button
                    // className="shadow-md w-full md:p-[0.575] sm:p-[0.775rem] p-[0.675rem] bg-[#CF2D39] text-white hover:bg-[#b0242f]"
                    // style={{ border: "1px solid black" }}
                    type="submit"
                    className={`${
                      authLoading && "bg-[#dad3d3] hover:bg-[#dad3d3]"
                    } relative shadow-md w-full p-2 bg-[#CF2D39] text-white hover:bg-[#b0242f]`}
                  >
                    Login
                    {authLoading && (
                      <div className="absolute top-[30%] left-[47%]">
                        <CircularProgress size={"20px"} />
                      </div>
                    )}
                  </button>

                  <p className="text-slate-400 my-2">
                    Don’t have an account ?{" "}
                    <Link
                      to="/signup"
                      className="text-[#CF2D39] cursor-pointer hover:text-[#b0242f] inline"
                    >
                      Register
                    </Link>
                  </p>
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
                  </div>
                </div>
              </form>
              {/* form_inputs section end-----------------*/}
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
      {/* <form onSubmit={onLogin}>
        <div>
          <h1>This is the login page</h1>
          <input
            placeholder="email"
            name="email"
            type="email"
            required
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            required
          />
          <button type="submit">login</button>
          {authLoading ? <h2>Loading...</h2> : null}
        </div>
      </form> */}
    </div>
  );
};

export default LoginPage;
