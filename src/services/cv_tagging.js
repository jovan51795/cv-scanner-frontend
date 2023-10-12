import { http } from "./http";

export const getAllKeywords = async () => {
  return await http.get(`/api/v2/scanner/get-keywords`).then((res) => {
    return res;
  });
};
