import { getRefreshTokenFromLS } from "../../core/utils/auth";
import http, { http2 } from "core/utils/http";
import { User } from "../Users/type";
import { AuthChange, AuthResponse } from "./type";
import {
  ResponseData,
  SuccessResponseValid,
} from "core/types/utils.type";

const URL = "/auth";
const authApi = {
  login(body: { username: string; password: string }) {
    return http2.post<AuthResponse>(`${URL}/login`, body);
  },
  updateAuth(id: number | string, body: FormData) {
    return http.put<User>(`${URL}/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  changePassword(body: AuthChange) {
    return http.put<SuccessResponseValid<ResponseData>>(
      `${URL}/change-password`,
      body
    );
  },
  logout() {
    return http2.post<User>(`${URL}/logout`, {
      refreshToken: getRefreshTokenFromLS(),
    });
  },
  
};
export default authApi;
