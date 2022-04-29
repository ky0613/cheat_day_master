import axios from "axios";

const production = "https://cheat-day-master.herokuapp.com";
const development = "http://127.0.0.1:5000/";
const url = process.env.NODE_ENV === "production" ? production : development;

const axiosConfig = axios.create({ baseURL: `${url}/api/` });

if (localStorage.auth_token) {
  axiosConfig.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.auth_token}`;
}

export default axiosConfig;
