import login_image from "../../../assets/images/login-image.png";
import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";
import upload_icon from "../../../assets/images/upload-icon.png";
import { Button } from "@mui/material";
import { showMessage } from "../../../store/shared_stateSlice";
import { applyForVerifyingBusinessAccount } from "../../../store/api/authApi";

const BusinessVerificationPage = () => {
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location?.state?.userId;
  // const submit = (e) => {
  //   e.preventDefault();
  //   if (e.target.email.value) {
  //     setAuthLoading(true);
  //     setError(null);
  //     console.log(e.target.email.value);
  //     sendOtp(e.target.email.value)
  //       .then((res) => {
  //         console.log("sendOtp res", res);
  //         dispatch(showMessage(res.data.msg));
  //         setAuthLoading(false);
  //         navigate("/verify-otp", { state: { email: e.target.email.value } });
  //       })
  //       .catch((err) => {
  //         setAuthLoading(false);
  //         dispatch(showMessage(err.response.data.message));
  //       });
  //   } else {
  //     setError("enter email address");
  //   }
  // };

  const [uploads, setUploads] = useState([]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log(URL.createObjectURL(event.target.files[0]));
      setUploads([...uploads, URL.createObjectURL(event.target.files[0])]);
    }
  };

  const submit = () => {
    if (uploads.length > 0) {
      //dummy for now
      // applyForVerifyingBusinessAccount({
      //   companyDocuments: "url for doc",
      //   companyProfilePicture: "url for pic",
      //   userId,
      // })
      //   .then((res) => {
      //     console.log(res);
      //     dispatch(showMessage(res.data.msg));
      //     // navigate("/login");
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     dispatch(showMessage(err.response.data.message));
      //   });
      navigate("/login");
    } else {
      dispatch(showMessage("upload documents first..."));
    }
  };

  // useEffect(() => {
  //   if (!userId) {
  //     navigate(-1);
  //   }
  // }, []);

  return (
    <div className="flex">
      {/* side one  */}
      <div className="sm:w-1/2 w-full flex sm:mt-0 mt-20 flex-col items-center justify-center">
        {" "}
        <form className="flex flex-col justify-center mt-4 h-full mx-5">
          <div className="my-5">
            <Link
              to="/login"
              className="text-[#CF2D39] inline  hover:text-[#b0242f]"
            >
              &lt; &nbsp; Back
            </Link>
          </div>
          <div className="">
            <h1 className="leading-[135%] mb-2 text-lg font-bold">
              Start your verification today
            </h1>
            <p className="text-[grey] text-sm leading-[135%]">
              Send us your business documents so Boon4 admin can verify you.
            </p>
          </div>
          <div id="file" className="mt-10">
            <p className="leading-[135%] mb-2 text-md text-[rgba(0, 0, 0, 1)] font-bold">
              Upload your business documents e.g SSM
            </p>
            <div id="file_uplaod_container" className="text-[#CF2D39] mt-8">
              <div className="w-full flex flex-wrap justify-start">
                <Button
                  // variant="contained"
                  component="label"
                  sx={{
                    border: "1px dashed #CF2D39",
                    padding: " 1rem 1.5rem",
                    width: "8rem",
                    height: "6rem",
                    margin: "1rem 1rem 1rem 0",
                  }}
                >
                  <div className="text-center flex flex-col items-center">
                    <img src={upload_icon} alt="" className="" />
                    <div className="mt-3">Upload File</div>
                    <input type="file" hidden onChange={onImageChange} />
                  </div>
                </Button>
                {uploads.length > 0 &&
                  uploads.map((upload) => {
                    return (
                      <div className="border-2 w-[8rem] h-[6rem] flex justify-center items-center p-2  my-4 mr-4">
                        <img src={upload} alt="" className="w-full h-full" />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div id="Buttons" className="mt-5">
            <button
              onClick={submit}
              className={`${authLoading && "bg-[#dad3d3] hover:bg-[#dad3d3]"}
                 relative shadow-md w-[20rem] p-3 bg-[#CF2D39] text-white hover:bg-[#b0242f]`}
            >
              Submit for verification
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

export default BusinessVerificationPage;
