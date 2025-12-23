export interface NewPostData {
  title: string;
  image: File;
}

export interface Post {
  _id: string;
  title: string;
  image: string;
  userId: string;
  userName: string;
  likes: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}
