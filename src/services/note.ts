import request from "../utils/request";

console.log(import.meta.env.BASE_URL);
export const getNotes = (
  page: number,
  pageSize = 10
): Promise<{ result: NoteDatatype[] }> => {
  return request(`/api/note/get/notes/${page}/${pageSize}`);
};

export const postImage = (formData: FormData): Promise<{ result: string }> => {
  return request.post(`/api/media/upload/file`, formData);
};

export const getTopic = (): Promise<{ result: string[] }> => {
  return request.get(`/api/topic/get/8`);
};

export const getFollower = (
  page = 0,
  pageSize = 10
): Promise<{ result: UserMsgDatatype[] }> => {
  return request.get(`/api/follow/each/other/${pageSize}/${page}`);
};

export const publishNote = (formData: any): Promise<{ result: string }> => {
  return request.post(`/api/note/publish`, formData);
};
