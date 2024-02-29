import { defineStore } from "pinia";
import type { AxiosResponse } from "axios";
import User from "@/api/user";

type updateData = {
  nickname: string;
  bio: string;
};

export const useUserStore = defineStore("user", () => {
  // const hasLogin = !!localStorage.getItem("accessToken");
  const hasLogin = true; // for test

  // get user data
  async function getUserData() {
    const getResult = (await User.apiGetUserData()) as AxiosResponse;
    if (getResult && getResult.data && getResult.data.statusCode === 200) {
      const userData = {
        nickname: getResult.data.data.nickname || getResult.data.data.name,
        bio: getResult.data.data.bio || "尚未填寫自我介紹", // default bio data
        email: getResult.data.data.email || "test@gmail.com", // default email data
      };
      return userData;
    } else {
      throw new Error("Failed to get user data. Please check your login state");
    }
  }
  async function updateUserData(updateData: updateData) {
    const putResult = (await User.apiUpdateUserData(
      updateData
    )) as AxiosResponse;
    if (putResult && putResult.data && putResult.data.statusCode === 200) {
      return putResult.data;
    } else {
      throw new Error(
        "Failed to update user data. Please check your input data again"
      );
    }
  }

  return { getUserData, updateUserData, hasLogin };
});
