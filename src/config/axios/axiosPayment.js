import axios from "axios";

const baseUrl = process.env.REACT_APP_PAYMENT;

const axiosPayment = axios.create({
  // for Payment apis
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPayment.interceptors.request.use(async (config) => {
  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);

  const token = loginDetails?.token;

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

axiosPayment.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;

    if (status === 401 || status === 403) {
      throw new Error("Unauthoried user");
    }

    return Promise.reject(error);
  }
);

export default axiosPayment;
