import axios from "axios";

const baseUrl = process.env.REACT_APP_ADMIN;

const axiosAdmin = axios.create({
  // for identity apis
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAdmin.interceptors.request.use(async (config) => {
  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);

  const token = loginDetails?.token;

  config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

axiosAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;

    if (status === 401) {
      throw new Error("Unauthoried user");
    } else if (status === 403) {
      throw new Error("You do not have permission to access this resource");
    }
    // else if (status === 500)
    //   throw new Error(
    //     "Our servers are currently facing issues. Please try again later"
    //   );

    return Promise.reject(error);
  }
);

export default axiosAdmin;
