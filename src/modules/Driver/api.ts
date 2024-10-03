import http from "core/utils/http";
import { SuccessResponse } from "core/types/utils.type";
import { Driver } from "./type";

const URL = "/system/driver";
const api = {

  get() {
    return http.get<SuccessResponse<Driver[]>>(`/system`, {
      params: {
        key: "DRIVER",
      }
    });
  },
  update(formData: FormData) {
    return http.post<SuccessResponse<Driver>>(`${URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default api;
