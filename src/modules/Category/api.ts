import {
  ResponseData,
  SuccessResponse,
  SuccessResponseList,
  SuccessResponseValid,
} from "core/types/utils.type";
import http from "core/utils/http";
import { Category, Config } from "./type";

const URL = "/category";
const api = {
  getAll(params: any) {
    return http.get<SuccessResponseList<Config[]>>(`${URL}/get-all-category`, {
      params,
    });
  },
  create(body: Category) {
    return http.post<SuccessResponseValid<Config>>(`${URL}`, body);
  },
  update(id: number | string, formData: FormData) {
    return http.patch<SuccessResponseValid<Config>>(`${URL}/${id}`, formData);
  },
  delete(id: string | number) {
    return http.delete<ResponseData>(`${URL}/${id}`);
  },
  getBySlug(slug: string) {
    return http.get<SuccessResponse<Config>>(`${URL}/findBySlug/${slug}`);
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
