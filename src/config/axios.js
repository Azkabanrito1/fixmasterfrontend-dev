import axios from "axios";
import { baseUrl } from "./api";

const exceptionEndpoint = [
  `${baseUrl}/Account/publicregister`,
  `${baseUrl}/Account/login`,
  `${baseUrl}/Franchisee/createfranchiseeapplication`,
];

axios.interceptors.request.use(
  async (config) => {
    let loginDetails = localStorage.getItem("loginDetails");
    if (loginDetails) loginDetails = JSON.parse(loginDetails);

    const token = loginDetails?.token;

    if (token && !exceptionEndpoint.includes(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Add CORS headers to the response
    response.headers["Access-Control-Allow-Origin"] = "*";
    response.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    response.headers["Access-Control-Allow-Headers"] = "Content-Type";
    return response;
  },
  async (error) => {
    // console.log("ErrorMessage", error);
    if (!error.response) {
      throw new Error("No server response");
    } else if (error.response.status === 400) {
      throw new Error("Bad request");
    } else if (error.response.status === 401) {
      throw new Error("Unauthorized request");
    } else if (error.response.status === 403) {
      throw new Error("Forbidden request");
    } else if (error.response.status === 404) {
      throw new Error("Resource not found");
    } else if (error.response && error.response.status === 500) {
      throw new Error("Internal Server Error");
    }
    return Promise.reject(error);
  }
);

export default axios;
