import { defineStore } from "pinia";
import User, { userData } from "@/api/user";

export const useUserStore = defineStore("user", () => {
  // const hasLogin = !!localStorage.getItem("accessToken");
  const hasLogin = true; // for test

  // get user data
  async function getUserData() {
    const { data } = await User.apiGetUserData();
    const userData = {
      name: data.value.data?.name,
      lecturerBio: data.value.data?.lecturerBio || "尚未填寫自我介紹", // default bio data
    };
    return userData;
  }

  async function updateUserData(updateData: userData) {
    const { data } = await User.apiUpdateUserData(updateData);
    return data.value.data;
  }

  return { getUserData, updateUserData, hasLogin };
});
