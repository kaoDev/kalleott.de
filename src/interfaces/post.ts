export interface Post {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage?: {
    url: string;
  };
  content: string;
  course: string;
  tags: string[];
  draft: false;
}
