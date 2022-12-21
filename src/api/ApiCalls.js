import axios from "axios";
import { getToken } from "../services/LocalStorageService";

const token = getToken();

const ipCall = axios.create({
  baseURL: "http://ip-api.com/json/",
});

// For common config
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const stateDataApi = axios.create({
  baseURL: "http://localhost:8000/api/fetchdata/",
});

const extraStateDataApi = axios.create({
  baseURL: "http://localhost:8000/api/fetchdata/",
});

export { ipCall, stateDataApi, extraStateDataApi };
