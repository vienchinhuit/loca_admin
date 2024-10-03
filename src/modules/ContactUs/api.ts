import { ResponseData, SuccessResponse, SuccessResponseList, SuccessResponseValid } from "core/types/utils.type";
import http from "../../core/utils/http";
import { Config as UserConfig } from "./type";

const URL = "/contact";
const api = {
  getAll(params?: any) {
    return http.get<SuccessResponseList<UserConfig[]>>(`${URL}`, {
      params,
    });
  },
  create(body: UserConfig) {
    return http.post<SuccessResponseValid<UserConfig>>(`${URL}`, body);
  },
  update(id: number | string, body: UserConfig) {
    return http.patch<SuccessResponseValid<UserConfig>>(`${URL}/${id}`, body);
  },
  delete(id: string | number) {
    return http.delete<ResponseData>(`${URL}/${id}`);
  },
  getById(id: string | number) {
    return http.get<SuccessResponse<UserConfig>>(`${URL}/findById/${id}`);
  },
  updatePublish(id: string | number) {
    return http.put<ResponseData>(`${URL}/update-publish/${id}`);
  },
  deleteAll(listId: number[]) {
    return http.delete<ResponseData>(`${URL}/delete-rows`, {
      data: { listId },
    });
  },
  updatePublishAll(listId: number[], active: number) {
    return http.put<ResponseData>(`${URL}/update-list-active`, {
      listId,
      active,
    });
  },
};
export default api;
