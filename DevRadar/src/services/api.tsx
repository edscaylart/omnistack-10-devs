import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.18:3333"
});

export default api;
