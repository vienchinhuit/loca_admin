import http from "core/utils/http";
import {
  SuccessResponse,
  SuccessResponseValid,
} from "core/types/utils.type";
import { Config, User } from "modules/Users/type";

const URL = "/users";
const profileApi = {
//   getProfile() {
//     return http.get<SuccessResponse<Profile>>(`/auth/getProfile`);
//   },
  getProfile() {
    return http.get<SuccessResponse<User>>(`${URL}/get-profile`);
  },
  update(id: number | string, body: Config) {
    return http.patch<SuccessResponseValid<Config>>(`${URL}/${id}`, body);
  },
};
export default profileApi;