<template>
  <v-row class="fit100">
    <v-col cols="4" class="center">
      <div style="width: 400px" class="flex align-center justify-center">
        <v-card color="grey-accent-4">
          <v-tabs
            v-model="tab"
            type="segment"
            color="green-accent-4"
            align-tabs="center"
          >
            <v-tab class="custom-tab" value="login">登入</v-tab>
            <v-tab value="register">註冊</v-tab>
            <v-tab value="three">忘記密碼</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item v-model="tab" value="login">
                <v-form @submit.prevent>
                  <v-text-field
                    label="Email"
                    variant="outlined"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    label="密碼"
                    type="password"
                    variant="outlined"
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    block
                    color="green-accent-4"
                    variant="tonal"
                    @click="handleLogin"
                    >登入</v-btn
                  >
                </v-form>
              </v-window-item>

              <v-window-item value="register">
                <v-form @submit.prevent>
                  <v-text-field
                    bg-color="white"
                    :rules="rules"
                    label="輸入姓名"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    bg-color="white"
                    :rules="rules"
                    label="Email"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field
                    :rules="rules"
                    label="Password"
                    variant="outlined"
                  ></v-text-field>

                  <v-btn type="submit" block @click="handleRegister"
                    >註冊</v-btn
                  >
                </v-form>
              </v-window-item>

              <v-window-item value="three">Retrive password</v-window-item>
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

    <!-- <div class="d-flex align-center justify-center fit100">ss</div> -->
  </v-row>
</template>

<script setup lang="ts">
import Auth from "@/api/auth";

const tab = ref(null);

const userRegister = ref({
  name: "",
  email: "",
  password: "",
});

async function handleRegister() {
  // Register 註冊
  const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRule.test(userRegister.value.email)) {
    const registerResult = await Auth.apiPostRegister(userRegister.value);
    try {
      if (registerResult) {
        console.log("註冊: ", registerResult);
        // selectedTab.value = "login";
        // notification.success({
        //   content: "註冊成功",
        //   meta: "請重新登入",
        //   duration: 1500,
        //   keepAliveOnHover: false,
        //   closable: false,
        // });
      } else {
        // notification.error({
        //   content: "註冊失敗",
        //   meta: "請與相關人員聯繫",
        //   duration: 1500,
        //   keepAliveOnHover: false,
        //   closable: false,
        // });
      }
    } catch {
      // notification.error({
      //   content: "註冊失敗",
      //   meta: "請與相關人員聯繫",
      //   duration: 1500,
      //   keepAliveOnHover: false,
      //   closable: false,
      // });
    }
  } else {
    // notification.error({
    //   content: "email格式錯誤",
    //   meta: "請輸入正確的email格式",
    //   duration: 1500,
    //   keepAliveOnHover: false,
    //   closable: false,
    // });
  }
}

const rules = [
  (value: string) => {
    if (value) {
      console.log("rules: ", value);
      return true;
    }

    return "You must enter a first name.";
  },
];

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
