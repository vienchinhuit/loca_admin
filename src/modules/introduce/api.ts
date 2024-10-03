import http from "core/utils/http";
import {
  SuccessResponse,
} from "core/types/utils.type";
import { Banner } from "modules/Banner/type";
import { Introduce } from "./type";

const URL = "/system/introduce";
const api = {
  get() {
    return http.get<SuccessResponse<Introduce[]>>(`/system`, {
      params: {
        key: "INTRODUCE",
      }
    });
  },
  update(formData: FormData) {
    return http.post<SuccessResponse<Banner>>(`${URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },
};
export default api;