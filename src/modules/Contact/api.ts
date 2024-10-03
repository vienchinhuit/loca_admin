import {
  SuccessResponse,
  SuccessResponseValid,
} from "core/types/utils.type";
import http from "core/utils/http";
import { InformationConfig, KeyTitleConfig, SocialConfig, SocialContact } from "./type";

const api = {
  getInfo() {
    return http.get<SuccessResponse<InformationConfig[]>>(`/system`, {
      params: {
        key: "CONTACT",
      }
    });
  },
  updateInfo(formData: FormData) {
    return http.post<SuccessResponse<InformationConfig>>(`/system/contact`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getGeneralInfo() {
    return http.get<SuccessResponse<InformationConfig[]>>(`/system`, {
      params: {
        key: "GENERAL_INFO",
      }
    });
  },
  updateGeneralInfo(formData: FormData) {
    return http.post<SuccessResponseValid<InformationConfig>>(`/system/general-info`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getSocial() {
    return http.get<SuccessResponse<SocialConfig[]>>(`/system`, {
      params: {
        key: "SOCIAL",
      }
    });
  },
  updateSocial(data: SocialContact) {
    return http.post<SuccessResponseValid<SocialConfig>>(`/system/social`, data);
  },
  getKeyTitle(key: string) {
    return http.get<SuccessResponse<KeyTitleConfig[]>>(`/system`, {
      params: {
        key: key,
      }
    });
  },
  updateKeyTitle(data: SocialContact, keyUrl: string) {
    return http.post<SuccessResponseValid<SocialConfig>>(`/system/${keyUrl}`, data);
  },

  
  // updatePublish(id: string | number) {
  //   return http.put<ResponseData>(`${URL}/update-publish/${id}`);
  // },
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
