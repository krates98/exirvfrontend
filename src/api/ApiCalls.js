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
  baseURL: "http://backend.exirv.xyz/api/fetchdata/",
});

const userIp = axios.create({
  baseURL: "http://backend.exirv.xyz/api/userip/",
});

const adminApi = axios.create({
  baseURL: "http://backend.exirv.xyz/api/admin/",
});

const attendanceApi = axios.create({
  baseURL: "http://backend.exirv.xyz/api/user/",
});

const advertiserApi = axios.create({
  baseURL: "http://backend.exirv.xyz/api/advertiser/",
});

export { ipCall, stateDataApi, userIp, adminApi, advertiserApi, attendanceApi };
