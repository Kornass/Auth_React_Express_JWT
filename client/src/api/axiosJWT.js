import axios from "axios";
const BASE_URL = "http://localhost:4040";

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosAuth;
