import request from "../utils/request";

export const accountDetail = (): Promise<{
  code: number;
  msg: string;
  result: UserMsgDatatype;
  successful: boolean;
}> => request(`/auth/details/info/1`);
