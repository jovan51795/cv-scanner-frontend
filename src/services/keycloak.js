import http from "./http";

export const login = (cred) => {
  return http.post("/token", cred);
};

export const getToken = () => {
  const token = sessionStorage.getItem("cv_tagging");
  if (token) {
    return JSON.parse(token).access_token;
  }
  return false;
};
