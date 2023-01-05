import axios from "axios";
import { getToken } from "../services/LocalStorageService";

const token = getToken();

axios.defaults.headers.post["Content-Type"] = "application/json";

const ipCall = axios.create({
  baseURL: "http://ip-api.com/json/",
});

// For common config

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const stateDataApi = axios.create({
  baseURL: "http://localhost:8000/api/fetchdata/",
});

const userIp = axios.create({
  baseURL: "http://localhost:8000/api/userip/",
});

const adminApi = axios.create({
  baseURL: "http://localhost:8000/api/admin/",
});

const attendanceApi = axios.create({
  baseURL: "http://localhost:8000/api/user/",
});

const advertiserApi = axios.create({
  baseURL: "http://localhost:8000/api/advertiser/",
});

export { ipCall, stateDataApi, userIp, adminApi, advertiserApi, attendanceApi };
