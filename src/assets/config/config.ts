import { Authors, Config } from 'src/models/config';

const AUTHORS: Authors = {
  pf: {
    name: 'Piotr Fraszczak',
    imgSrc: '/images/authors/pfraszczak.jpg',
    socialMedia: {
      Facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
      Linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=',
      Twitter: 'https://twitter.com/intent/tweet?text=',
    },
  },
};

export const blogConfig: Config = {
  authors: AUTHORS,
};
