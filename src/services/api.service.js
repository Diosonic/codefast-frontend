import axios from "axios";

const url = "http://localhost:5165/";

const api = axios.create({
  baseURL: url,
  
});

export default api;
