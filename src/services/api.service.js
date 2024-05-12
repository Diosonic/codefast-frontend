import axios from "axios";

const url = "https://codefast-api-uninassau.azurewebsites.net/";

const api = axios.create({
  baseURL: url,
});

export default api;
