<template>
  <div>
    <v-row class="fit100">
      <!-- https://stackoverflow.com/questions/67344913/how-to-fix-mismatching-childnodes-with-vuetify-select-value-saved-in-nuxt-store -->
      <client-only>
        <v-snackbar
          v-model="showNotification"
          color="white"
          :timeout="1500"
          location="top right"
          multi-line
        >
          <h2>{{ msgTitle }}</h2>
          <br />
          <p>{{ msgMeta }}</p>
          <template #actions>
            <v-btn color="red" variant="text" @click="showNotification = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </client-only>
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
                          class="hoverable"
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
                          class="hoverable"
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
import { ref } from "vue";
import { Auth } from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const selectedTab = ref("");
const showNotification = ref(false);
const msgTitle = ref("");
const msgMeta = ref("");

const showPassword = ref(false);
const handleMouseDown = (event: MouseEvent) => {
  showPassword.value = true;
  event.preventDefault();
};

const handleMouseUp = (event: MouseEvent) => {
  showPassword.value = false;
  event.preventDefault();
};

const loginData = reactive({
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
  const emailRuleTest = emailRule.test(registerData.value.email);
  const passwordRuleTest = passwordRule.test(registerData.value.password);

  if (!registerData.value.name) {
    showNotification.value = true;
    msgTitle.value = "請輸入姓名";
    msgMeta.value = "";
  } else if (!emailRuleTest) {
    showNotification.value = true;
    msgTitle.value = "email格式錯誤";
    msgMeta.value = "請輸入正確的email格式";
  } else if (!passwordRuleTest) {
    showNotification.value = true;
    msgTitle.value = "密碼格式錯誤";
    msgMeta.value = "請輸入6位數以上的密碼";
  } else {
    const registerResult = await Auth.apiPostRegister(registerData.value);
    try {
      if (registerResult && registerResult.data.success) {
        msgTitle.value = "註冊成功";
        msgMeta.value = "請重新登入";
        showNotification.value = true;

        selectedTab.value = "login";
      } else {
        showNotification.value = true;
        msgTitle.value = "註冊失敗";
        msgMeta.value = "請與相關人員聯繫";
      }
    } catch {
      msgTitle.value = "註冊失敗";
      showNotification.value = true;
    }
  }
}

async function handleLogin() {
  // Login 登入
  const emailRuleTest = emailRule.test(loginData.email);
  const passwordRuleTest = passwordRule.test(loginData.password);

  if (!emailRuleTest) {
    showNotification.value = true;
    msgTitle.value = "email格式錯誤";
    msgMeta.value = "請輸入正確的email格式";
  } else if (!passwordRuleTest) {
    showNotification.value = true;
    msgTitle.value = "密碼格式錯誤";
    msgMeta.value = "請輸入6位數以上的密碼";
  } else {
    try {
      const loginResult = await authStore.login(loginData);
      if (loginResult.success) {
        showNotification.value = true;
        msgTitle.value = "登入成功";
        if (localStorage.getItem("fromVisitorCart")) {
          router.push("/cart");
        } else {
          router.push("/");
        }
      } else {
        showNotification.value = true;
        msgTitle.value = "登入失敗";
        msgMeta.value = "請輸入正確帳號密碼";
      }
    } catch (error) {
      showNotification.value = true;
      msgTitle.value = "登入失敗";
      msgMeta.value = "請輸入正確帳號密碼";
    }
  }
}

const validationRules = {
  required: (value: string) => !!value || "Required.",
  email: (value: string) => {
    return emailRule.test(value) || "Invalid e-mail.";
  },
  password: (value: string) => {
    return passwordRule.test(value) || "Invalid password.";
  },
};
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

.hoverable {
  cursor: pointer;
}
</style>
