import axios from "axios";

export const setSession = (access_token) => {
  if (access_token) {
    localStorage.setItem("jwt_access_token", JSON.stringify(access_token));
    // localStorage.setItem("jwt_refresh_token", refresh_token);
    axios.defaults.headers.common["authorization"] = "Bearer " + access_token;
  } else {
    localStorage.removeItem("jwt_access_token");
    // localStorage.removeItem("jwt_refresh_token");
    delete axios.defaults.headers.common["authorization"];
  }
};
export const getAccessToken = () => {
  return JSON.parse(window.localStorage.getItem("jwt_access_token"));
};
// export const getRefreshToken = () => {
//   return window.localStorage.getItem("jwt_refresh_token");
// };
