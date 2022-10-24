import login_image from "../../assets/images/login-image.png";
import React from "react";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

const TermsConditionsPage = () => {
  return (
    <div className="flex">
      {/* side one  */}
      <div className="sm:w-1/2 w-full">
        <div className="sm:mx-10 md:mx-20 mx-10  mt-10">
          <Link
            to="/signup"
            className="text-[#CF2D39] inline  hover:text-[#b0242f]"
          >
            &lt; &nbsp; Back
          </Link>
        </div>
        <div className="sm:mx-10 md:mx-20 mx-10 my-4">
          <div className="text-left font-[700] text-[28px]">
            Terms and condtions
          </div>
          <div className="text-slate-500 my-3">
            Please review and agree to the documents below.
          </div>
          <div className="text-slate-500 my-3 mt-5 text-justify text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Id
            cursus metus aliquam eleifend. Ut pharetra sit amet aliquam. Aenean
            pharetra magna ac placerat vestibulum lectus mauris. Mollis nunc sed
            malesuada bibendum arcu. Duis at tellus at urna condimentum mattis.
            Sed elementum tempus egestas sed sed risus pretium. Nunc mi ipsum
            faucibus vitae aliquet nec ullamcorper sit. Sem fringilla u
          </div>
          <div className="text-slate-500 my-3 mt-5 text-justify text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna. Id
            cursus metus aliquam eleifend. Ut pharetra sit amet aliquam. Aenean
            pharetra magna ac placerat vestibulum lectus mauris. Mollis nunc sed
            id semper risus in hendrerit gravida.
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

export default TermsConditionsPage;
