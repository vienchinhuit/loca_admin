import { ResponseData, SuccessResponse, SuccessResponseList, SuccessResponseValid } from "core/types/utils.type";
import http from "core/utils/http";
import { Config, ConfigAbouUs } from "./type";

const URL = "/system/about";
const URL_ITEM = "/about"
const api = {

  get() {
    return http.get<SuccessResponse<ConfigAbouUs[]>>(`/system`, {
      params: {
        key: "ABOUT",
      }
    });
  },
  updateAboutUs(formData: FormData) {
    return http.post<SuccessResponseValid<ConfigAbouUs>>(`${URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getAll(params: any) {
    return http.get<SuccessResponseList<Config[]>>(`${URL_ITEM}`, {
      params,
    });
  },
  create(formData: FormData) {
    return http.post<SuccessResponseValid<Config>>(`${URL_ITEM}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id: number | string, formData: FormData) {
    return http.patch<SuccessResponseValid<Config>>(`${URL_ITEM}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(id: string | number) {
    return http.delete<ResponseData>(`${URL_ITEM}/${id}`);
  },
  getById(id: string | number) {
    return http.get<SuccessResponse<Config>>(`${URL_ITEM}/findById/${id}`);
  },
  updatePublish(id: string | number) {
    return http.put<ResponseData>(`${URL_ITEM}/update-publish/${id}`);
  },
  updateSort(id: string | number, sort: number | string) {
    return http.put<ResponseData>(`${URL_ITEM}/update-sort/${id}`, {sort: sort});
  },
  deleteAll(listId: number[]) {
    return http.delete<ResponseData>(`${URL_ITEM}/delete-rows`, {
      data: { listId },
    });
  },
  updatePublishAll(listId: number[], publish: number) {
    return http.put<ResponseData>(`${URL_ITEM}/update-list-publish`, {
      listId,
      publish,
    });
  },
};
export default api;