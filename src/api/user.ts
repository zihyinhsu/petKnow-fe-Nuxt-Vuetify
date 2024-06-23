// import { req } from "./https";
export enum Role {
  TEACHER = "teacher",
  STUDENT = "student",
}
export interface IUser {
  /** 身份 Id */
  role?: Role[];
  /** 名字 */
  name: string;
  /** 大頭照 */
  mugShot?: string;
  /** 電子郵件 */
  email: string;
  /** 密碼 (加密存儲) */
  password: string;
  /** 講師簡介 */
  lecturerBio?: string;
  /** 是否凍結 */
  isFrozen?: boolean;
  /** 是否啟用通知 */
  isNotificationEnabled?: boolean;
  /** 是否啟用隱私 */
  isPrivacyEnabled?: boolean;
  /** 最後登入時間 */
  lastLoginTime?: Date;
  /** 創建時間 */
  createdAt?: Date;
  /** 更新時間 */
  updatedAt?: Date;
  token?: string;
}
export interface userData {
  name: IUser["name"];
  lecturerBio: IUser["lecturerBio"];
}
const user = {
  apiGetUserData(option?: HttpOption<IUser>) {
    return useHttp.get<IUser>("/user/show", {
      ...option,
    });
  },
  apiUpdateUserData(data: userData, option?: HttpOption<IUser>) {
    return useHttp.patch<IUser>("/user/update", data, {
      ...option,
    });
  },
};

export default user;
