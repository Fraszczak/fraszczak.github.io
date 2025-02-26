import { Authors } from '../../../core/models/config';

export default interface PostAttributes {
  title: string;
  author: keyof Authors;
  publishDate: string;
  slug: string;
  description: string;
  coverImage: string;
  prev: string;
  next: string;
  tags: string[];
}
