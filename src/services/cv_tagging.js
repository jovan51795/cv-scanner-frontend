import { http } from "./http";

export const getAllKeywords = async () => {
  return await http.get(`/api/v2/scanner/get-all-keywords`).then((res) => {
    return res;
  });
};
