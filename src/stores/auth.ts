import { defineStore } from "pinia";
// import { computed, ref } from "vue";
// import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const userToken = ref<string>();
  const accessToken = computed(() => userToken.value);
  const router = useRouter();

  function logout() {
    userToken.value = "";
    localStorage.setItem("accessToken", "");
    router.push("/login");
  }

  return { userToken, logout, accessToken };
});
