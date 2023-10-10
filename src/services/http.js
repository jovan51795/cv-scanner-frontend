import axios from "axios";
import { env } from "../env";
const http = axios.create({
  baseURL: env.TOKEN_URL,
});

export const keyCloakHttp = axios.create({
  baseURL: env.TOKEN_URL,
});

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error(error);
    alert("An unexpected error occurred");
  }
  return Promise.reject(error);
});

export default http;
