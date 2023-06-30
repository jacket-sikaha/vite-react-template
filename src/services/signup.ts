import request from "../utils/request";

export const accountLogin = (
  userMsg: AccountDatatype
): Promise<{
  code: number;
  msg: string;
  result: unknown;
  successful: boolean;
}> => {
  return request.post(`/api/auth/login`, { type: "Account", ...userMsg });
};
