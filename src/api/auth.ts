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

// export const Auth = {
//   apiPostLogin(data: loginData) {
//     return req("post", "/login", data);
//   },
//   apiPostRegister(data: registerData) {
//     return req("post", "/register", data);
//   },
// };

enum AuthApi {
  login = "/login",
  register = "/register",
}

// option就是useFetch的选项参数
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
