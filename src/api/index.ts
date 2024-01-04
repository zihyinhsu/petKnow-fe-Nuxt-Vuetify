import * as Auth from "./auth";
export interface resultType {
  message: string;
  isSuccess: boolean;
  status: number;
  data: any;
}
export default { Auth };
