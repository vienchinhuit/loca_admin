import axios, { AxiosError } from "axios";
import HttpStatusCode from "../constants/httpStatusCode.enum";
import { ErrorResponse } from "../types/utils.type";
import { format } from "date-fns";

// Kiem tra xem co phai loi axiosError khong
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

// Kiem tra xem có phải kiểu lỗi 400 không
export function isBadRequestEntityError<FromError>(
  error: unknown
): error is AxiosError<FromError> {
  return (
    isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
  );
}
 // Loi 401
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}
// // Kiem tra xem có phải kiểu lỗi 422 không
// export function isBadRequestEntityError<FromError>(error: unknown): error is AxiosError<FromError> {
//   return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
// }

export const formatDate = (isoString: Date | string) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const formatDateYMD = (date: Date | string) => {
  return format(date, "yyyy-MM-dd");
};
export function formatCurrency(currency: number) {
  return Number(currency).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
export function formatCurrencyPrice(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
