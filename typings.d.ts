export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: Author;
  description: string;
  mainImage: MainImage;
  slug: Slug;
  body: object[];
  comments: Comment[];
}

export interface Author {
  name: string;
  image: string;
}

export interface MainImage {
  asset: {
    url: string;
  };
}

export interface Slug {
  current: string;
}

export interface CommentFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export interface Comment {
  _id: string;
  _createdAt: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
}
