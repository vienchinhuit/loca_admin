import {
  ResponseData,
  SuccessResponse,
  SuccessResponseList,
  SuccessResponseValid,
} from "core/types/utils.type";
import http from "core/utils/http";
import { Config, KeyTitle, KeyTitleConfig } from "./type";

const URL = "/news";
const api = {
  getKeyTitle(key: string) {
    return http.get<SuccessResponse<KeyTitleConfig[]>>(`/system`, {
      params: {
        key: key,
      }
    });
  },
  updateKeyTitle(data: KeyTitle, keyUrl: string) {
    return http.post<SuccessResponseValid<KeyTitleConfig>>(`/system/${keyUrl}`, data);
  },

  getAll(params: any) {
    return http.get<SuccessResponseList<Config[]>>(`${URL}/getAll`, {
      params,
    });
  },
  create(formData: FormData) {
    return http.post<SuccessResponseValid<Config>>(`${URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id: number | string, formData: FormData) {
    return http.patch<SuccessResponseValid<Config>>(`${URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(id: string | number) {
    return http.delete<ResponseData>(`${URL}/${id}`);
  },
  getById(id: string) {
    return http.get<SuccessResponse<Config>>(`${URL}/get-one-by-id/${id}`);
  },
  updatePublish(id: string | number) {
    return http.put<ResponseData>(`${URL}/update-publish/${id}`);
  },
  deleteAll(listId: number[]) {
    return http.delete<ResponseData>(`${URL}/delete-rows`, {
      data: { listId },
    });
  },
  updatePublishAll(listId: number[], publish: number) {
    return http.put<ResponseData>(`${URL}/update-list-publish`, {
      listId,
      publish,
    });
  },
};
export default api;
