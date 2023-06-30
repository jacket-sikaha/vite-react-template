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
