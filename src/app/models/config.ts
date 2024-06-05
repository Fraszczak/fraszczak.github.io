export type SocialMedia = {
  Facebook: string;
  Instagram: string;
  Twitter: string;
  GitHub: string;
  Dribbble: string;
  Linkedin: string;
  Back: '../'; // I know...
};

export type Author = {
  name: string;
  imgSrc: string;
  socialMedia: Partial<SocialMedia>;
};

export type Authors = {
  [K in 'pf']: Author;
};

export type Config = {
  authors: Authors;
};
