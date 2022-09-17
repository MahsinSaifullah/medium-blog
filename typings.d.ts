export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: Author;
  description: string;
  mainImage: MainImage;
  slug: Slug;
  body: object[];
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
