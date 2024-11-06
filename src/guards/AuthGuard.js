import { useLocation, Navigate, Outlet } from "react-router-dom";
import moment from "moment";
import { useGetUserProfile } from "../hooks/useQueries/useIdentity";

const AuthGuard = ({ authRole }) => {
  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);
  const location = useLocation();

  // console.log(location);

  useGetUserProfile();

  const role = loginDetails?.role;
  const token = loginDetails?.token;
  const expiration = loginDetails?.expiration;
  const now = moment();

  const isExpired = now.isAfter(expiration, "hour");
  if (isExpired) {
    localStorage.removeItem("loginDetails");
  }

  if (!token || isExpired)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (role?.toLowerCase() === authRole?.toLowerCase()) {
    return <Outlet />;
  } else {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
};

export default AuthGuard;
