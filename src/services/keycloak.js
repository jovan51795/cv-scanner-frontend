import { keyCloakHttp } from "./http";

export const login = async (cred) => {
  return await keyCloakHttp.post("/api/auth/authenticate", cred).then((res) => {
    return res;
  });
};

export const logout = () => {
  sessionStorage.removeItem("cv_tagging");
  window.location.reload();
};

export const getToken = () => {
  const token = sessionStorage.getItem("cv_tagging");
  if (token) {
    return JSON.parse(token).token;
  }
  return false;
};
