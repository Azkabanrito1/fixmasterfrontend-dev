// ========================= FRANCHISEE APIs ==============================

import { axios, baseUrl } from "../../config";
import { LOADING, STOP_LOADING } from "../auth/reducers";

// =========================franchisee cse managed====================================

export const getCSEManaged = () => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(`${baseUrl}/Franchisee/CSEManaged`);

    if (response.status === 200) {
      const { message, data } = response?.data;
      return { message, data };
    }
  } catch (error) {
    const { message } = error?.response?.data;
    return message;
  } finally {
    dispatch(STOP_LOADING());
  }
};

// ============================franchisee cse training=============================

export const trainingInvitation = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Franchisee/TrainingInvitation`,
      payload
    );

    if (response.status === 200) {
      const { message, data, status } = response?.data || {
        message: "",
        data: [],
        status: "",
      };

      return { data, message, status };
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

export const getTrainingInvitations = () => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(
      `${baseUrl}/Franchisee/CSETrainingInvitations`
    );

    if (response.status === 200) {
      const { message, cseTrainingInvitation: data, status } = response?.data;
      return { message, data, status };
    }
  } catch (error) {
    const { message } = error?.response?.data;
    return message;
  } finally {
    dispatch(STOP_LOADING());
  }
};

// ============================estate and commercial customers=============================
export const getEstateCustomerListings =
  (FromDate = "", ToDate = "", StatusType = "") =>
  async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await axios.get(
        `${baseUrl}/Franchisee/EstateCustomerListings${
          FromDate ? `?FromDate=${FromDate}` : ""
        }${ToDate ? `?ToDate=${ToDate}` : ""}${
          StatusType ? `?StatusType=${StatusType}` : ""
        }`
      );

      if (response.status === 200) {
        const { message, data, status } = response.data;
        return { message, data, status };
      }
    } catch (error) {
      const { message } = error?.response?.data;
      return message;
    } finally {
      dispatch(STOP_LOADING());
    }
  };

export const getCommercialCustomersListings =
  (FromDate = "", ToDate = "", StatusType = "") =>
  async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await axios.get(
        `${baseUrl}/Franchisee/CommercialCustomerListings${
          FromDate ? `?FromDate=${FromDate}` : ""
        }${ToDate ? `?ToDate=${ToDate}` : ""}${
          StatusType ? `?StatusType=${StatusType}` : ""
        }`
      );

      if (response.status === 200) {
        const { message, data, status } = response.data;
        return { message, data, status };
      }
    } catch (error) {
      const { message } = error?.response?.data;
      return message;
    } finally {
      dispatch(STOP_LOADING());
    }
  };

export const createCommercialCustomer = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Franchisee/CreateCommercialCustomer`,
      payload
    );

    if (response.status === 200) {
      const { message, status } = response?.data;

      return { status, message };
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

export const createEstateCustomer = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Franchisee/CreateEstateCustomer`,
      payload
    );

    if (response.status === 200) {
      const { message, status } = response?.data;

      return { status, message };
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
