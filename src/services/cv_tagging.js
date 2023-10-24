import { http } from "./http";

export const getAllKeywords = async (page, pageSize) => {
  return await http
    .get(`/api/v2/scanner/get-all-keywords?page=${page}&size=${pageSize}`)
    .then((res) => {
      return res;
    });
};

export const deleteKeyword = async (data) => {
  console.log(data);
  return await http
    .delete(`/api/v2/scanner/keywords?id=${data.id}`)
    .then((res) => {
      return res;
    });
};

export const patchKeyword = async (data) => {
  return await http.patch(`/api/v2/scanner/keywords`, data);
};
