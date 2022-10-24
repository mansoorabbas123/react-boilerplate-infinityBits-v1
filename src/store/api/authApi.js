import axios from "axios";
import Domain from "../../services/Endpoint";
import { showMessage } from "../shared_stateSlice";

export const signupUser = async (inputData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${Domain}/api/client/signUp`, inputData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const sendOtp = async (email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${Domain}/api/client/sendOTP`, { email })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const verifyOtp = async (otp, email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${Domain}/api/client/verifyUser`, { email, otp })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const changePassword = async (id, newPassword, email) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${Domain}/api/client/changePassword/${id}`, { newPassword, email })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const userBusinessSignup = async (inputData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${Domain}/api/client/createBusinessAccount`, inputData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const applyForVerifyingBusinessAccount = async (inputData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${Domain}/api/client/applyForVerifyingBusinessAccount`, inputData)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
