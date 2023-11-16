import { req } from "./https";

interface loginData {
  email: string;
  password: string;
}
interface registerData {
  name: string;
  email: string;
  password: string;
}

export const Auth = {
  apiPostLogin(data: loginData) {
    return req("post", "/login", data);
  },
  apiPostRegister(data: registerData) {
    return req("post", "/register", data);
  },
};
