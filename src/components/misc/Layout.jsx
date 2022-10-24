import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const pathname = location?.pathname;
  const render = () => {
    return pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/verify-otp" || pathname.startsWith("/reset-password") || pathname === "/terms-conditions" || pathname === "/business-verification"
      ? true
      : false;
  };
  return (
    <div>
      {render() ? null : <Navbar />}
      {children}
    </div>
  );
};

export default Layout;
