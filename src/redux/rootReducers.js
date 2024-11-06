import { combineReducers } from "redux";

import auth from "./auth/reducers";
import equipment from "./equipment/reducers";
import user from "./user/reducers";

const appReducer = combineReducers({
  auth,
  equipment,
  user,
});

const rootReducers = (state, action) => {
  if (action.type === "LOGOUT") {
    localStorage.removeItem("loginDetails");
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducers;
