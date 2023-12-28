import * as Auth from "./auth";
export interface resultType {
  message: string;
  success: true;
  statusCode: number;
  data: any;
}
export default { Auth };
