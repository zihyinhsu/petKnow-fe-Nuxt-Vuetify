// import { req } from "./https";

import { resultType } from ".";
import { HttpOption } from "@/composables/useHttps";

interface loginData {
  email: string;
  password: string;
}
interface registerData {
  name: string;
  email: string;
  password: string;
}

enum AuthApi {
  login = "/auth/login",
  register = "/auth/signup",
}

// option 就是 useFetch 的選項參數
export const apiPostLogin = async (
  params: loginData,
  option?: HttpOption<resultType>
) => {
  return await useHttp.post<resultType>(AuthApi.login, params, option);
};

export const apiPostRegister = async (
  params: registerData,
  option?: HttpOption<resultType>
) => {
  return await useHttp.post<resultType>(AuthApi.register, params, option);
};
