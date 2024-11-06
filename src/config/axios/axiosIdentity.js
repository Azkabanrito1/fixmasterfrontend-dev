import axios from "axios";

const baseUrl = process.env.REACT_APP_IDENTITY;

const axiosIdentity = axios.create({
  // for identity apis
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosIdentity.interceptors.request.use(async (config) => {
  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);

  const token = loginDetails?.token;

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

axiosIdentity.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error;

    if (status === 401 || status === 403) {
      throw new Error("Unauthoried user");
    }

    return Promise.reject(error);
  }
);

export default axiosIdentity;
