import {
  ResponseData,
  SuccessResponse,
  SuccessResponseList,
  SuccessResponseValid,
} from "core/types/utils.type";
import http from "core/utils/http";
import { System } from "./type";

const URL = "/branch";
const api = {
  getAll(params: any) {
    return http.get<SuccessResponseList<System[]>>(`${URL}`, {
      params,
    });
  },
  create(body: System) {
    return http.post<SuccessResponseValid<System>>(`${URL}`, body);
  },
  update(id: number | string, body: System) {
    return http.patch<SuccessResponseValid<System>>(`${URL}/${id}`, body);
  },
  delete(id: string | number) {
    return http.delete<ResponseData>(`${URL}/${id}`);
  },
  getById(id: string | number) {
    return http.get<SuccessResponse<System>>(`${URL}/findById/${id}`);
  },
  updatePublish(id: string | number) {
    return http.put<ResponseData>(`${URL}/update-status/${id}`);
  },
  // deleteAll(listId: number[]) {
  //   return http.delete<ResponseData>(`${URL}/delete-rows`, {
  //     data: { listId },
  //   });
  // },
  // updatePublishAll(listId: number[], publish: number) {
  //   return http.put<ResponseData>(`${URL}/update-list-publish`, {
  //     listId,
  //     publish,
  //   });
  // },
};
export default api;
