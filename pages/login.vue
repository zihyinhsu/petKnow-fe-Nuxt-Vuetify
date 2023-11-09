<template>
  <div>
    <v-row class="fit100">
      <!-- https://stackoverflow.com/questions/67344913/how-to-fix-mismatching-childnodes-with-vuetify-select-value-saved-in-nuxt-store -->
      <client-only>
        <v-snackbar v-model="loginFailedBar" multi-line>
          {{ loginMessage }}
          <template #actions>
            <v-btn color="red" variant="text" @click="loginFailedBar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar v-model="registerResultBar" multi-line>
          {{ registerReason }}
          <template #actions>
            <v-btn color="red" variant="text" @click="loginFailedBar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </client-only>
      <v-col cols="4" class="center">
        <div class="text-center"></div>
        <div style="width: 400px" class="d-flex align-center justify-center">
          <v-card color="grey-accent-4">
            <v-tabs v-model="tab" color="green-accent-4" align-tabs="center">
              <v-tab value="login">登入</v-tab>
              <v-tab value="register">註冊</v-tab>
              <v-tab value="three">忘記密碼</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item v-model="tab" value="login">
                  <v-form @submit.prevent>
                    <br />
                    <v-text-field
                      v-model="loginData.email"
                      :rules="[rules.required, rules.email]"
                      placeholder="johndoe@gmail.com"
                      label="Email"
                      type="email"
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      v-model="loginData.password"
                      :rules="[rules.required, rules.password]"
                      label="密碼"
                      type="password"
                      variant="outlined"
                    ></v-text-field>
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
                      :rules="[rules.required]"
                      label="輸入姓名"
                      type="text"
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      v-model="registerData.email"
                      :rules="[rules.required, rules.email]"
                      label="Email"
                      type="email"
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      v-model="registerData.password"
                      :rules="[rules.required, rules.password]"
                      label="密碼"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

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
                    @click="handleLogin"
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
import { Auth } from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

const tab = ref(null);
const loginFailedBar = ref(false);
const loginMessage = ref("");
const registerResultBar = ref(false);
const registerReason = ref("");
const loginData = reactive({
  email: "Abc1231@gmail.comaa",
  password: "Abc123",
});

const registerData = reactive({
  name: "",
  email: "",
  password: "",
});

async function handleRegister() {
  // Register 註冊
  const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRule.test(registerData.email)) {
    const registerResult = await Auth.apiPostRegister(registerData);
    try {
      console.log("registerResult: ", registerResult);
      if (registerResult) {
        registerReason.value = "註冊成功";
        registerResultBar.value = true;
        // selectedTab.value = "login";
        // notification.success({
        //   content: "註冊成功",
        //   meta: "請重新登入",
        //   duration: 1500,
        //   keepAliveOnHover: false,
        //   closable: false,
        // });
      } else {
        registerReason.value = "註冊失敗";
        registerResultBar.value = true;
        // notification.error({
        //   content: "註冊失敗",
        //   meta: "請與相關人員聯繫",
        //   duration: 1500,
        //   keepAliveOnHover: false,
        //   closable: false,
        // });
      }
    } catch {
      registerReason.value = "註冊失敗";
      registerResultBar.value = true;
    }
  } else {
    registerReason.value = "email格式錯誤";
    registerResultBar.value = true;
    // notification.error({
    //   content: "email格式錯誤",
    //   meta: "請輸入正確的email格式",
    //   duration: 1500,
    //   keepAliveOnHover: false,
    //   closable: false,
    // });
  }
}

async function handleLogin() {
  // Login 登入
  try {
    const loginResult = await authStore.login(loginData);
    console.log("loginResult", loginResult);
    if (loginResult.success) {
      if (localStorage.getItem("fromVisitorCart")) {
        router.push("/cart");
      } else {
        router.push("/");
      }
      loginFailedBar.value = true;
      loginMessage.value = "登入成功";
    } else {
      loginFailedBar.value = true;
      loginMessage.value = "登入失敗";
    }
  } catch (error) {
    loginFailedBar.value = true;
    loginMessage.value = "登入失敗";
  }
}

const rules = {
  required: (value: string) => !!value || "Required.",
  email: (value: string) => {
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRule.test(value) || "Invalid e-mail.";
  },
  password: (value: string) => {
    const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRule.test(value) || "Invalid password.";
  },
};

// const validateRules = {
//   name: {
//     required: true,
//     message: "輸入姓名",
//     trigger: ["input", "blur"],
//   },
//   email: {
//     required: true,
//     message: "輸入email",
//     trigger: ["input", "blur"],
//   },
//   password: {
//     required: true,
//     message: "輸入密碼",
//     trigger: ["input", "blur"],
//   },
// };
</script>
<style>
.fit100 {
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
</style>
