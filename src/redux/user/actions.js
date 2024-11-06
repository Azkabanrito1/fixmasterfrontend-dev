import { axios, baseUrl } from "../../config";
import { LOADING, STOP_LOADING } from "../auth/reducers";
import {
  SET_USER_REFERRALS,
  SET_QUALIFICATIONS,
  SET_CUSTOMER_USER_CARD,
  SET_PROMOTION,
  SET_USER_ROLES,
  SET_CONTACT_PREF_OPTIONS,
} from "./reducers";

export const states = () => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(`${baseUrl}/Values/states`);

    if (response.status === 200) {
      const { data } = response?.data;
      return data;
    }
  } catch (error) {
    const { message } = error;
    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const lga = (stateId) => async (dispatch) => {
  try {
    dispatch(LOADING());
    const response = await axios.get(`${baseUrl}/Values/lgas/${stateId}`);

    if (response.status === 200) {
      const { data } = response?.data || { data: [] };
      return {
        status: true,
        data,
      };
    }
  } catch (error) {
    const { message } = error;
    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const cities = (lgaId) => async (dispatch) => {
  try {
    dispatch(LOADING());
    const response = await axios.get(`${baseUrl}/Values/cities/${lgaId}`);

    if (response.status === 200) {
      const { data } = response?.data || { data: [] };
      return {
        status: true,
        data,
      };
    }
  } catch (error) {
    const { message } = error;
    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const getTerritories = (cityId) => async (dispatch) => {
  try {
    dispatch(LOADING());
    const response = await axios.get(`${baseUrl}/Values/territories/${cityId}`);

    if (response.status === 200) {
      const { data, message, status } = response?.data;

      return {
        status,
        data,
        message,
      };
    }
  } catch (error) {
    const { message } = error;
    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const getQualifications = () => async (dispatch, getState) => {
  const qualOpts = getState().user.qualifications;

  if (qualOpts.length > 0) return;

  try {
    dispatch(LOADING());
    const response = await axios.get(`${baseUrl}/Values/academicqualification`);

    if (response.status === 200) {
      const { data } = response?.data || { data: [] };
      dispatch(SET_QUALIFICATIONS(data));
      return data;
    }
  } catch (error) {
    const { message } = error;
    dispatch(SET_QUALIFICATIONS([]));
    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const userReferrals = () => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(`${baseUrl}/Customer/GetAllReferrals`);

    if (response.status === 200) {
      const { data } = response?.data || { data: {} };
      dispatch(SET_USER_REFERRALS(data));
    }
  } catch (error) {
    const { message } = error;
    dispatch(SET_USER_REFERRALS({}));
    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

// ---------------------- FILE UPLOADS ---------------------------

export const uploadedFileDelete = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Upload/DeleteUploadedFile?publicId=${payload}`
    );

    if (response.status === 200) {
      const { message } = response?.data.data || { message: "" };

      return {
        status: true,
        message,
      };
    }
  } catch (error) {
    const { message } = error;

    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

// =========================== ADMIN APIs ===========================

export const addNewCards = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(`${baseUrl}/Values/newcard`, payload);

    if (response.status === 200) {
      const { message } = response?.data;

      return {
        status: true,
        message,
      };
    }
  } catch (error) {
    const { message } = error;
    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const getuserCard = () => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(`${baseUrl}/Values/getusercards`);
    if (response.status === 200) {
      const { userCards } = response?.data;
      dispatch(SET_CUSTOMER_USER_CARD(userCards));
      return userCards;
    }
  } catch (error) {
    const { message } = error?.response?.userCard;
    return message;
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const updateDefaultCard = (cardId) => async (dispatch) => {
  try {
    dispatch(LOADING());
    const response = await axios.post(
      `${baseUrl}/Values/updateisdefaultcard/${cardId}`
    );

    if (response.status === 200) {
      const { message } = response?.data;

      return {
        status: true,
        message,
      };
    }
  } catch (error) {
    const { message } = error;

    return {
      status: false,
      message,
    };
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const getPreferenceContactOptions = () => async (dispatch, getState) => {
  const { contactPreferences } = getState().user;

  if (contactPreferences.length > 0) return;

  try {
    dispatch(LOADING());

    const response = await axios.get(
      `${baseUrl}/UserPreference/GetPreferenceContactDetails`
    );
    if (response.status === 200) {
      const { data } = response?.data;
      dispatch(SET_CONTACT_PREF_OPTIONS(data));
      return data;
    }
  } catch (error) {
    const { message } = error;
    return message;
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const getPromotion = () => async (dispatch, getState) => {
  const { promotion } = getState().user;

  if (promotion.length > 0) {
    return;
  }

  try {
    dispatch(LOADING());

    const response = await axios.get(`${baseUrl}/Promotion/GetPromotions`);
    if (response.status === 200) {
      const { data } = response?.data;
      dispatch(SET_PROMOTION(data));
      return data;
    }
  } catch (error) {
    const { message } = error;
    return message;
  } finally {
    dispatch(STOP_LOADING());
  }
};

export const getUserRoles =
  (update = false) =>
  async (dispatch, getState) => {
    const { userRoles } = getState().user;

    if (userRoles?.length > 0 && !update) {
      return;
    }

    try {
      dispatch(LOADING());

      const response = await axios.get(`${baseUrl}/Values/UserRoles`);
      if (response.status === 200) {
        const { data } = response;
        dispatch(SET_USER_ROLES(data));
        return data;
      }
    } catch (error) {
      const { message } = error;
      return message;
    } finally {
      dispatch(STOP_LOADING());
    }
  };

export const userPromotion = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());
    const response = await axios.post(
      `${baseUrl}/Promotion/UsePromotionForNewFix`,
      payload
    );
    console.log(response);
  } catch (error) {
    const { message } = error;
    return message;
  } finally {
    dispatch(STOP_LOADING());
  }
};
