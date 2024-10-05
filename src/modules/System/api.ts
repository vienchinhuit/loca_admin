import {
  ResponseData,
  SuccessResponse,
  SuccessResponseList,
  SuccessResponseValid,
} from "core/types/utils.type";
import http from "core/utils/http";
import { KeyTitle, KeyTitleConfig, Branch } from "./type";

const URL = "/branch";
const api = {
  getKeyTitle(key: string) {
    return http.get<SuccessResponse<KeyTitleConfig[]>>(`/system`, {
      params: {
        key: key,
      },
    });
  },
  updateKeyTitle(data: KeyTitle, keyUrl: string) {
    return http.post<SuccessResponseValid<KeyTitleConfig>>(
      `/system/${keyUrl}`,
      data
    );
  },
  getAll(params: any) {
    return http.get<SuccessResponseList<Branch[]>>(`${URL}`, {
      params,
    });
  },
  create(body: Branch) {
    return http.post<SuccessResponseValid<Branch>>(`${URL}`, body);
  },
  update(id: number | string, body: Branch) {
    return http.patch<SuccessResponseValid<Branch>>(`${URL}/${id}`, body);
  },
  delete(id: string | number) {
    return http.delete<ResponseData>(`${URL}/${id}`);
  },
  getById(id: string | number) {
    return http.get<SuccessResponse<Branch>>(`${URL}/findById/${id}`);
  },
  updatePublish(id: string | number) {
    return http.put<ResponseData>(`${URL}/update-publish/${id}`);
  },
  updateSort(id: string | number, sort: number | string) {
    return http.put<ResponseData>(`${URL}/update-sort/${id}`, { sort: sort });
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
