import axios from "axios";

const url = "http://18.204.206.39/";

const api = axios.create({
  baseURL: url,
});

export default api;
