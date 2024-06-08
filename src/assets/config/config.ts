import { Authors, Config } from '../../app/core/models';

const AUTHORS: Authors = {
  pf: {
    name: 'Piotr Frąszczak',
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
