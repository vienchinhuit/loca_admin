import {
  ResponseData,
  SuccessResponse,
  SuccessResponseList,
  SuccessResponseValid,
} from "core/types/utils.type";
import http from "core/utils/http";
import { Config, KeyTitle, KeyTitleConfig } from "./type";

const URL = "/why-choose";
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
    return http.get<SuccessResponseList<Config[]>>(`${URL}`, {
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
  getById(id: string | number) {
    return http.get<SuccessResponse<Config>>(`${URL}/findById/${id}`);
  },
  updatePublish(id: string | number) {
    return http.put<ResponseData>(`${URL}/update-publish/${id}`);
  },
  updateSort(id: string | number, sort: number | string) {
    return http.put<ResponseData>(`${URL}/update-sort/${id}`, {sort: sort});
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
