import axios from "axios";
import { getToken } from "../services/LocalStorageService";

const token = getToken();

axios.defaults.headers.post["Content-Type"] = "application/json";

const ipCall = axios.create({
  baseURL: "https://ipapi.co/json",
});

// For common config

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const stateDataApi = axios.create({
  baseURL: "https://seashell-app-99ve3.ondigitalocean.app/api/fetchdata/",
});

const userIp = axios.create({
  baseURL: "https://seashell-app-99ve3.ondigitalocean.app/api/userip/",
});

const adminApi = axios.create({
  baseURL: "https://seashell-app-99ve3.ondigitalocean.app/api/admin/",
});

const attendanceApi = axios.create({
  baseURL: "https://seashell-app-99ve3.ondigitalocean.app/api/user/",
});

const advertiserApi = axios.create({
  baseURL: "https://seashell-app-99ve3.ondigitalocean.app/api/advertiser/",
});

const hitIps = axios.create({
  baseURL: "https://seashell-app-99ve3.ondigitalocean.app/api/userip/hitroute",
});

export {
  ipCall,
  stateDataApi,
  userIp,
  adminApi,
  advertiserApi,
  attendanceApi,
  hitIps,
};
