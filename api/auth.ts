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
const login = {
  apiPostLogin(data: loginData) {
    return req("post", "/login", data);
  },
  apiPostRegister(data: registerData) {
    return req("post", "/register", data);
  },
};

export default login;
