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
  apiPostLogin(params: loginData) {
    return useHttp.post("/auth/login", params);
  },
  apiPostRegister(params: registerData) {
    return useHttp.post("/auth/signup", params);
  },
};

export default Auth;
