declare interface NoteDatatype {
  id: number;
  userId: number;
  username: string;
  userAvatar: string;
  title: string;
  content: string;
  images: string;
  location: string;
  feeling: string;
  callUsers: string[] | number[];
  topic: string[];
  likes: number;
  comments: number;
  collections: number;
  status: number;
  createTime: string;
}
declare interface UserMsgDatatype {
  id: number;
  username: string;
  nickname: string;
  nickName: string;
  avatar: string;
  introduction: string;
  sex: string;
  ip: string;
  follows: number;
  fans: number;
  likes: number;
}

declare interface AccountDatatype {
  username: string;
  password: string;
  cellPhone: string;
  email: string;
  code: string;
  type: string;
}
