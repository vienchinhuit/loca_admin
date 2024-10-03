import { User } from "modules/Users/type";
import Cookies from "js-cookie";
export const LocalStorageEventTarget = new EventTarget();

// Luu access_token len localStorage
export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

// Lay access_token tren localStorage
export const getAccessTokenFromToLS = () =>
  localStorage.getItem("access_token") || "";

// Luu refresh_token len localStorage
export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem("refresh_token", refresh_token);
};

// Lay refresh_token tren localStorage
export const getRefreshTokenFromLS = () =>
  localStorage.getItem("refresh_token") || "";

// Luu access_token len localStorage
export const setProfileToLS = (user: User) => {
  localStorage.setItem("profile", JSON.stringify(user));
};

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

// Clear local storage
export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile");
  const clearLSEvent = new Event("clearLS");
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const setTokenToCookie = (
  name: string,
  token: string,
  expires: number
) => {
  // const expiresTime = new Date();
  // expires.(expires.getSeconds() + 10);
  Cookies.set(name, token, { expires: expires }); // Cookie sẽ tồn tại trong 7 ngày
};

export const getTokenFromCookie = (name: string) => {
  return Cookies.get(name) || "";
};

export const clearCookie = (name: string) => {
  return Cookies.remove(name);
};
