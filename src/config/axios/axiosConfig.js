import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL_SFW;
// const baseUrl = process.env.REACT_APP_BASEURL_FXM;

export const axiosPublic = axios.create({
  // for unauthenticated users
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  // for authenticated users
  // baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAuth.interceptors.request.use(async (config) => {
  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);

  const token = loginDetails?.token;

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

axiosAuth.interceptors.response.use(
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
