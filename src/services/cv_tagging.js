import { http } from "./http";


export const getAllKeywords = async (page, pageSize) => {
  return await http
    .get(`/api/v2/scanner/get-keywords?page=${page}&size=${pageSize}`)
    .then((res) => {
      return res;
    });

};
