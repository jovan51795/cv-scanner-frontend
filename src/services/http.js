import axios from "axios";
import { env } from "../env";
import { getToken } from "./keycloak";
export const http = axios.create({
  baseURL: env.baseURL,
});

export const keyCloakHttp = axios.create({
  baseURL: env.TOKEN_URL,
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    console.log(error, "this is the error");
    return Promise.reject(error);
  }
);

http.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error(error);
    // alert("An unexpected error occurred");
  }
  return Promise.reject(error);
});

// export default http;
