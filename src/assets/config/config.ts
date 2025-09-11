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

export const skillsConfig = [
  // Inner Orbit
  {
    id: "html",
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: "html" as const,
    phaseShift: 0,
    glowColor: "cyan" as const,
    label: "HTML5",
  },
  {
    id: "css",
    orbitRadius: 100,
    size: 45,
    speed: 1,
    iconType: "css" as const,
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "cyan" as const,
    label: "CSS3",
  },
  {
    id: "javascript",
    orbitRadius: 100,
    size: 40,
    speed: 1,
    iconType: "javascript" as const,
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "cyan" as const,
    label: "JavaScript",
  },
  // Outer Orbit
  {
    id: "react",
    orbitRadius: 180,
    size: 50,
    speed: -0.6,
    iconType: "react" as const,
    phaseShift: 0,
    glowColor: "purple" as const,
    label: "React",
  },
  {
    id: "node",
    orbitRadius: 180,
    size: 45,
    speed: -0.6,
    iconType: "node" as const,
    phaseShift: (2 * Math.PI) / 3,
    glowColor: "purple" as const,
    label: "Node.js",
  },
  {
    id: "tailwind",
    orbitRadius: 180,
    size: 40,
    speed: -0.6,
    iconType: "tailwind" as const,
    phaseShift: (4 * Math.PI) / 3,
    glowColor: "purple" as const,
    label: "Tailwind CSS",
  },
];
