import axios from "axios";
const BASE_URL = "http://localhost:4040";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: JSON.parse(localStorage.getItem("user"))?.token,
  },
});
