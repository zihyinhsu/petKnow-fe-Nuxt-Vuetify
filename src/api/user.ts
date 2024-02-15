import { req } from "./https";

interface userData {
  nickname: string;
  bio: string;
}

const user = {
  apiGetUserData() {
    return req("get", "/user/show");
  },
  apiUpdateUserData(data: userData) {
    return req("put", "/user/update", data);
  },
};

export default user;
