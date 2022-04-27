import axios from "axios";

const production = "https://cheat-day-master.herokuapp.com";
const development = "http://localhost:5000";
const url = process.env.NODE_ENV ? production : development;

const axiosConfig = axios.create({ baseURL: `${url}/api/` });
export default axiosConfig;
