import { LOADING, STOP_LOADING } from "./reducers";

export const logout = () => async (dispatch) => {
  dispatch(LOADING());

  // localStorage.removeItem("loginDetails");
  dispatch({ type: "LOGOUT" });

  dispatch(STOP_LOADING());
};
