import axios from "axios";

const axiosPublic = axios.create({
  // for unauthenticated users
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
