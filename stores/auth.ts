import { defineStore } from "pinia";
import type { AxiosResponse } from "axios";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
// import Auth from "@/api/auth";
import { Auth } from "@/api/auth";

type loginData = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore("auth", () => {
  const userToken = ref<string>();
  const accessToken = computed(() => userToken.value);
  const router = useRouter();

  // 登入
  async function login(loginData: loginData) {
    const { email, password } = loginData;
    const result = (await Auth.apiPostLogin({
      email: email.trim(),
      password,
    })) as AxiosResponse;
    if (result.data) {
      const { token } = result.data.data;
      userToken.value = token;
      // localStorage 存進 accessToken
      if (token) localStorage.setItem("accessToken", token);

      return result.data;
    } else {
      console.log("error.response.status=>", result);
      alert("帳號密碼錯誤，請重新輸入");
      throw new Error("Failed to authenticate. Check your login data.");
    }
  }

  function logout() {
    userToken.value = "";
    localStorage.setItem("accessToken", "");
    router.push("/login");
  }

  return { login, logout, accessToken };
});
