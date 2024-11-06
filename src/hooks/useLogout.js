import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/actions";
// import { useSnackbar } from "notistack";
// import { useSetUserLogSession } from "./useQueries/useIdentity";

const useLogout = (action) => {
  // action is the function to fire after the user has logged out
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // const { enqueueSnackbar } = useSnackbar();

  // const onLogSuccess = (response) => {
  //   console.log(response.message);
  // };
  // const onLogError = (response) => {
  //   console.log(response.message);
  // };

  // const { mutate: setUserSession } = useSetUserLogSession(
  //   onLogSuccess,
  //   onLogError
  // );

  // const currentDateAndTime = new Date();
  // const formattedDateAndTime = currentDateAndTime.toISOString();

  const handleLogout = async () => {
    // const payload = {
    //   dateLog: formattedDateAndTime,
    //   type: "logout",
    // };
    // setUserSession(payload);

    dispatch(logout());
    queryClient.clear();
    if (action) action();
  };

  return handleLogout;
};

export default useLogout;
