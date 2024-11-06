import { LOADING, STOP_LOADING } from "../auth/reducers";
import { baseUrl, axios } from "../../config";

// ======================equipment hire===================
export const createHireRequest = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Equipment/CreateHireRequest`,
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

export const getAllEquipment = () => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(`${baseUrl}/Equipment/Equipments`);

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

export const getAllHireRequests =
  (FromDate = "", ToDate = "") =>
  async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await axios.get(
        `${baseUrl}/Equipment/EquipmentHireRequests${
          FromDate ? `?FromDate=${FromDate}` : ""
        }${ToDate ? `?ToDate=${ToDate}` : ""}`
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

export const addEquipment = (payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Equipment/Equipment`,
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

export const getEquipmentDetails = (equipmentId) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(
      `${baseUrl}/Equipment/EquipmentDetails/equipmentId?equipmentId=${equipmentId}`
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

export const getHireRequestDetails = (requestId) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.get(
      `${baseUrl}/Equipment/EquipmentHireRequests/requestId?requestId=${requestId}`
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

export const updateEquipmentCondition =
  (equipmentId, EquipmentCondition) => async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await axios.put(
        `${baseUrl}/Equipment/EquipmentCondition/equipmentId?equipmentId=${equipmentId}&EquipmentCondition=${EquipmentCondition}`
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

export const updateEquipmentInformation =
  (equipmentId, payload) => async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await axios.put(
        `${baseUrl}/Equipment/EquipmentInformation/equipmentId?equipmentId=${equipmentId}`,
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

export const deleteEquipment = (equipmentId) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.delete(
      `${baseUrl}/Equipment/DeleteEquipment/equipmentId?equipmentId=${equipmentId}`
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

export const acceptHireRequest = (requestId, payload) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Equipment/ApproveEquipmentHireRequest/requestId?requestId=${requestId}`,
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

export const rejectHireRequest = (requestId) => async (dispatch) => {
  try {
    dispatch(LOADING());

    const response = await axios.post(
      `${baseUrl}/Equipment/RejectEquipmentHireRequest/requestId?requestId=${requestId}`
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

export const getEquipmentActivities =
  (FromDate = "", ToDate = "") =>
  async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await axios.get(
        `${baseUrl}/Equipment/GetEquipmentActivities${
          FromDate ? `?FromDate=${FromDate}` : ""
        }${ToDate ? `?ToDate=${ToDate}` : ""}`
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

export const getOneEquipmentActivities =
  (equipmentId, FromDate = "", ToDate = "") =>
  async (dispatch) => {
    try {
      dispatch(LOADING());

      const response = await axios.get(
        `${baseUrl}/Equipment/EquipmentActivities/equipmentId?equipmentId=${equipmentId}${
          FromDate ? `?FromDate=${FromDate}` : ""
        }${ToDate ? `?ToDate=${ToDate}` : ""}`
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
