import {
  ResponseData,
  SuccessResponse,
  SuccessResponseList,
  SuccessResponseValid,
} from "core/types/utils.type";
import http from "core/utils/http";
import { Menu } from "./type";

const URL = "/menu";
const api = {
  getAll(params: any) {
    return http.get<SuccessResponseList<Menu[]>>(`${URL}`, {
      params,
    });
  },
  create(body: Menu) {
    return http.post<SuccessResponseValid<Menu>>(`${URL}`, body);
  },
  update(id: number | string, body: Menu) {
    return http.patch<SuccessResponseValid<Menu>>(`${URL}/${id}`, body);
  },
  delete(id: string | number) {
    return http.delete<ResponseData>(`${URL}/${id}`);
  },
  getById(id: string | number) {
    return http.get<SuccessResponse<Menu>>(`${URL}/findById/${id}`);
  },
  updatePublish(id: string | number) {
    return http.put<ResponseData>(`${URL}/update-publish/${id}`);
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
