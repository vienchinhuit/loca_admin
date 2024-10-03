import {
    ResponseData,
    ResponseExcel,
    SuccessResponse,
    SuccessResponseList,
    SuccessResponseValid,
  } from "../../core/types/utils.type";
  import http from "../../core/utils/http";
  import { Config as ProductConfig } from "./type";
  
  const URL = "/product";
  const api = {
    getAll(params?: any) {
      return http.get<SuccessResponseList<ProductConfig[]>>(`${URL}`, {
        params,
      });
    },
    create(formData: FormData) {
      return http.post<SuccessResponseValid<ProductConfig>>(`${URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    update(id: string | number, formData: FormData) {
      return http.patch<SuccessResponseValid<ProductConfig>>(`${URL}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    delete(id: string | number) {
      return http.delete<ResponseData>(`${URL}/${id}`);
    },
    deleteOneImage(id: string | number) {
      return http.delete<ResponseData>(`product-image/${id}`);
    },
    getById(id: string | number) {
      return http.get<SuccessResponse<ProductConfig>>(`${URL}/findById/${id}`);
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
    importExcel(formData: FormData) {
      // Kiểm tra xem publish có tồn tại trong FormData không
      return http.post<ResponseExcel>(`${URL}/import-excel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  };
  export default api;
  