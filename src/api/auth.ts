interface loginData {
  email: string;
  password: string;
}
interface registerData {
  name: string;
  email: string;
  password: string;
}

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

const Auth = {
  apiPostLogin(params: loginData, option?: HttpOption<IUser>) {
    return useHttp.post<IUser>("/auth/login", params, {
      ...option,
    });
  },
  apiPostRegister(params: registerData) {
    return useHttp.post<IUser>("/auth/signup", params);
  },
};

export default Auth;
