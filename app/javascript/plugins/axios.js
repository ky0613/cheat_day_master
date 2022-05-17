import axios from "axios";

const production = "https://www.cheat-day-master.com";
const development = "http://127.0.0.1:3000";
const url = process.env.NODE_ENV === "production" ? production : development;

const axiosConfig = axios.create({ baseURL: `${url}/api/` });

axiosConfig.defaults.xsrfCookieName = "CSRF-TOKEN";
axiosConfig.defaults.xsrfHeaderName = "X-CSRF-Token";
axiosConfig.defaults.withCredentials = true;

if (localStorage.auth_token) {
  axiosConfig.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.auth_token}`;
}

export default axiosConfig;
