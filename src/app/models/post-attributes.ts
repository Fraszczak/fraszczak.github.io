import { Authors } from './config';

export default interface PostAttributes {
  title: string;
  author: keyof Authors;
  publishDate: string;
  slug: string;
  description: string;
  coverImage: string;
  tags: string[];
}
