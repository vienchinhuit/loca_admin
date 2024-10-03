import http from "core/utils/http";
import { SuccessResponse, SuccessResponseValid } from "core/types/utils.type";
import { Banner } from "./type";

const URL = "/system/banner";
const api = {

  get() {
    return http.get<SuccessResponse<Banner[]>>(`/system`, {
      params: {
        key: "BANNER",
      }
    });
  },
  update(formData: FormData) {
    return http.post<SuccessResponseValid<Banner>>(`${URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default api;
