import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.page";
import LoginPage from "./pages/AuthPages/Login.page";
import ProductPage from "./pages/product/Product.page";
import NotFound from "./pages/notfound/NotFound.page";
import Layout from "./components/misc/Layout";
import ProtectedRoute from "./services/ProtectedRoutes";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import { hideMessage } from "./store/shared_stateSlice";
import ForgotPasswordPage from "./pages/AuthPages/ForgotPasswordPage";
import SignUpPage from "./pages/AuthPages/SignupPage";
import OtpPage from "./pages/AuthPages/OtpPage";
import NewPasswordPage from "./pages/AuthPages/NewPasswordPage";
import TermsConditionsPage from "./pages/AuthPages/TermsConditionsPage";
import BusinessVerificationPage from "./pages/AuthPages/business-verification/BusinessVerificationPage";

function App() {
  const dispatch = useDispatch();
  // show alert message setup for global use -----------------------------------------------------
  const alertMessage = useSelector(({ shared_state }) => shared_state);
  const alert = alertMessage.alertState;
  const { vertical, horizontal, open } = alert;
  // ---------------------------------------------------------------------------------------------

  useEffect(() => {
    // it will hide alert message after 3secs globaly ------------------------------------------
    if (alertMessage.alertState.open) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 3000);
    }
    // -------------------------------------------------------------------------------------------
  }, [alertMessage]);

  const navigate = useNavigate();
  // const authCheck = useBoundStore((state) => {
  //   return state.user ? state.user : false;
  // });
  const authCheck = useSelector(({ auth }) => {
    return auth.user ? auth.user : false;
  });

  useEffect(() => {
    // useEffect only if you want whole App private.
    if (authCheck === false) navigate("login");

    //remove this useEffect if You want some public pages in App.
    //Route can handle private pages individually through ProtectedRoute
  }, [authCheck]);

  return (
    <Layout>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/reset-password/:id" element={<NewPasswordPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route
            path="/business-verification"
            element={<BusinessVerificationPage />}
          />
          <Route
            path="products"
            element={
              <ProtectedRoute isAllowed={!!authCheck}>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          // onClose={handleClose}
          message={alertMessage.message && alertMessage.message}
          key={vertical + horizontal}
        />
      </div>
    </Layout>
  );
}

export default App;
