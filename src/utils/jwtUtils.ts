import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

import { TokenDataType } from "../@types/TokenDataType";

const getAccessToken = (): string => {
  return Cookies.get("accessToken") || "";
};

const decodeToken = (token?: string): TokenDataType => {
  if (token) return jwtDecode<TokenDataType>(token);
  return {} as TokenDataType;
};

const getDecodedAccessToken = (): TokenDataType => {
  return decodeToken(Cookies.get("accessToken"));
};

export { decodeToken, getDecodedAccessToken, getAccessToken };
