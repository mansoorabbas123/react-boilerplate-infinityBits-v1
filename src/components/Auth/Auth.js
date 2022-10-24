import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { setSession, getAccessToken } from "../../services/jwt.service";
import { loginWithTokenService, logoutService } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";

const Auth = ({ children }) => {
  //   const { loginWithToken, tokenLoading, logoutService } = useBoundStore(
  //     (state) => state
  //   );
  const dispatch = useDispatch();

  const handleAuthentication = async () => {
    let access_token = getAccessToken();
    console.log(access_token);
    // let refresh_token = getRefreshToken(); //not implemented yet from server
    if (!access_token) {
      dispatch(logoutService());
      return;
    }
    if (!isAuthTokenValid(access_token)) return;
    setSession(access_token);
    dispatch(loginWithTokenService());
  };

  const isAuthTokenValid = (access_token) => {
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      dispatch(logoutService());
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    handleAuthentication();
  }, []);

  //   return <div>{tokenLoading ? "Cool Loading here..." : children}</div>;
  return <div>{children}</div>;
};

export default Auth;
