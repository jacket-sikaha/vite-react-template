import request from "../utils/request";

export const accountDetail = (
  userID: string | number
): Promise<{
  code: number;
  msg: string;
  result: UserMsgDatatype;
  successful: boolean;
}> => request(`/api/auth/details/info/${userID}`);
