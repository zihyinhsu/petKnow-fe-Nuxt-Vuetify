import { IUser } from "./user";

interface loginData {
  email: string;
  password: string;
}
interface registerData {
  name: string;
  email: string;
  password: string;
}

const Auth = {
  apiPostLogin(params: loginData, option?: HttpOption<IUser>) {
    return useHttp.post<IUser>("/auth/login", params, {
      ...option,
    });
  },
  apiPostRegister(params: registerData) {
    return useHttp.post<IUser>("/auth/signup", params);
  },
};

export default Auth;
