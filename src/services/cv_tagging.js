import { http } from "./http";

export const getAllKeywords = async (page, pageSize) => {
  return await http
    .get(`/api/v2/scanner/get-all-keywords?page=${page}&size=${pageSize}`)
    .then((res) => {
      return res;
    });
};

export const searchKeywords = async (keyword) => {
  console.log(keyword);
  return await http
    .get(`/api/v2/scanner/search?keyword=${keyword}`)
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

export const updateKeywordStatus = async (data) => {
  return await http
    .put(`/api/v2/scanner/keyword-status?id=${data.id}`)
    .then((res) => {
      return res;
    });
};
