import axios from "axios";

// const url = "https://codefast-api-uninassau.azurewebsites.net/";
const url = "http://localhost:5165/";

const api = axios.create({
  baseURL: url,
});

export default api;
