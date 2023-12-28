<template>
  <div>
    <v-row class="fit">
      <!-- https://stackoverflow.com/questions/67344913/how-to-fix-mismatching-childnodes-with-vuetify-select-value-saved-in-nuxt-store -->
      <v-col cols="4" class="center">
        <div class="text-center"></div>
        <div style="width: 400px" class="d-flex align-center justify-center">
          <v-card color="grey-accent-4">
            <v-tabs
              v-model="selectedTab"
              color="green-accent-4"
              align-tabs="center"
            >
              <v-tab value="login">登入</v-tab>
              <v-tab value="register">註冊</v-tab>
              <v-tab value="three">忘記密碼</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="selectedTab">
                <v-window-item value="login">
                  <v-form @submit.prevent>
                    <br />
                    <v-text-field
                      v-model="loginData.email"
                      :rules="[validationRules.required, validationRules.email]"
                      placeholder="johndoe@gmail.com"
                      label="Email"
                      type="email"
                      variant="outlined"
                    ></v-text-field>
                    <br />
                    <v-text-field
                      v-model="loginData.password"
                      :rules="[
                        validationRules.required,
                        validationRules.password,
                      ]"
                      label="密碼"
                      :type="showPassword ? 'text' : 'password'"
                      variant="outlined"
                    >
                      <template #append-inner>
                        <v-icon
                          class="cursor-pointer"
                          @mousedown="handleMouseDown"
                          @mouseup="handleMouseUp"
                        >
                          {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                        </v-icon>
                      </template>
                    </v-text-field>
                    <br />
                    <v-btn
                      type="submit"
                      block
                      variant="tonal"
                      color="green-accent-4"
                      @click="handleLogin"
                      >登入</v-btn
                    >
                  </v-form>
                </v-window-item>
                <v-window-item value="register">
                  <v-form @submit.prevent>
                    <br />
                    <v-text-field
                      v-model="registerData.name"
                      placeholder="輸入姓名"
                      :rules="[validationRules.required]"
                      label="輸入姓名"
                      type="text"
                      variant="outlined"
                    ></v-text-field>
                    <br />
                    <v-text-field
                      v-model="registerData.email"
                      bg-color="white"
                      :rules="[validationRules.required, validationRules.email]"
                      label="Email"
                      type="email"
                      variant="outlined"
                    ></v-text-field>
                    <br />
                    <v-text-field
                      v-model="registerData.password"
                      :rules="[
                        validationRules.required,
                        validationRules.password,
                      ]"
                      label="密碼"
                      :type="showPassword ? 'text' : 'password'"
                      variant="outlined"
                    >
                      <template #append-inner>
                        <v-icon
                          class="cursor-pointer"
                          @mousedown="handleMouseDown"
                          @mouseup="handleMouseUp"
                        >
                          {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                        </v-icon>
                      </template>
                    </v-text-field>
                    <br />
                    <v-btn
                      type="submit"
                      block
                      variant="tonal"
                      color="green-accent-4"
                      class="mt-2"
                      @click="handleRegister"
                      >註冊</v-btn
                    >
                  </v-form>
                </v-window-item>
                <v-window-item value="three"
                  >重設密碼
                  <v-btn
                    type="submit"
                    block
                    variant="tonal"
                    color="green-accent-4"
                    class="mt-2"
                    >重設密碼</v-btn
                  >
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col cols="8">
        <div class="p-20" style="height: 100%">
          <img
            class="loginImg"
            src="https://www.10wallpaper.com/wallpaper/1366x768/1608/Dog_puppy_white_pet-Animal_Photos_HD_Wallpaper_1366x768.jpg"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// pinia
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const { userToken } = storeToRefs(authStore);

// api
const { Auth } = useApi();

const router = useRouter();
const alertData: any = inject("alertData");

const selectedTab = ref("");

const showPassword = ref(false);
const handleMouseDown = (event: MouseEvent) => {
  showPassword.value = true;
  event.preventDefault();
};

const handleMouseUp = (event: MouseEvent) => {
  showPassword.value = false;
  event.preventDefault();
};

const loginData = ref({
  email: "Abc1231@gmail.com",
  password: "Abc123",
});

const registerData = ref({
  name: "",
  email: "",
  password: "",
});

const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRule = /^.{6,}$/;

async function handleRegister() {
  // Register 註冊
  const { data } = await Auth.apiPostRegister(registerData.value);
  try {
    if (data.value?.success) {
      selectedTab.value = "login";
      loginData.value = registerData.value;
      alertData.value = {
        status: "success",
        content: "註冊成功 ｜ 請重新登入",
        visible: true,
      };
    } else {
      alertData.value = {
        status: "error",
        content: "註冊失敗 ｜ 請與相關人員聯繫",
        visible: true,
      };
    }
  } catch {
    alertData.value = {
      status: "error",
      content: "註冊失敗 ｜ 請與相關人員聯繫",
      visible: true,
    };
  }
}

async function handleLogin() {
  // Login 登入
  try {
    const { email, password } = loginData.value;
    const { data } = await Auth.apiPostLogin({
      email: email.trim(),
      password,
    });
    const { token } = data.value?.data as unknown as { token: string };
    userToken.value = token;
    // localStorage 存進 accessToken
    if (token) localStorage.setItem("accessToken", token);

    if (data.value?.success) {
      alertData.value = {
        status: "success",
        content: "登入成功",
        visible: true,
      };
      if (localStorage.getItem("fromVisitorCart")) {
        router.push("/cart");
      } else {
        router.push("/");
      }
    } else {
      alertData.value = {
        status: "error",
        content: "登入失敗 | 請輸入正確帳號密碼",
        visible: true,
      };
    }
  } catch (error) {
    alertData.value = {
      status: "error",
      content: "登入失敗 | 請輸入正確帳號密碼",
      visible: true,
    };
  }
}

const validationRules = {
  required: (value: string) => !!value || "此欄位為必填.",
  email: (value: string) => {
    return emailRule.test(value) || "請輸入正確的email格式";
  },
  password: (value: string) => {
    return passwordRule.test(value) || "請輸入6位數以上的密碼";
  },
};
</script>

<style>
.fit {
  height: 100vh;
  width: 100vw;
}
.loginImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 60px 0 0 60px;
  box-shadow: 10px 8px 8px rgb(174, 171, 171);
}
.p-20 {
  padding: 20px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
