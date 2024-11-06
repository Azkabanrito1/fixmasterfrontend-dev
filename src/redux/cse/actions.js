import { axios, baseUrl } from "../../config";
import { LOADING, STOP_LOADING } from "../auth/reducers";
import { SET_CSE_TOPICS } from "./reducers";

// ================================CSE Module ================================//
export const formTopics = () => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(`${baseUrl}/CSE/Topics`);
    if (response.status === 200) {
      const { data } = response?.data;
      dispatch(SET_CSE_TOPICS(data));
      return data;
    }
  } catch (error) {
    const { message } = error?.response?.data || "";
    return message;
  } finally {
    dispatch(STOP_LOADING());
  }
};
