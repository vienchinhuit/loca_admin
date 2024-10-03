import { SuccessResponse, SuccessResponseValid } from "core/types/utils.type";
import { User } from "../Users/type";

// Ràng buộc dữ liệu trả về khi đăng ký thành công
export type AuthResponse = SuccessResponseValid<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;

// Ràng buộc kiểu dữ liệu chuyền vào body khi thay đổi mật khẩu
export interface AuthChange {
  password: string;
  newPassword: string;
}

export type RefreshTokenReponse = SuccessResponse<{ accessToken: string }>;
