import { CodeBracketIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

// === SHARED CONSTANTS ===
export const PERSONAL_INFO = {
  firstName: 'Piotr',
  lastName: 'Fraszczak',
  image: '/assets/images/author.png',
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/12071995',
  github: 'https://github.com/Fraszczak',
  twitter: 'https://x.com/PPFraszczak',
  instagram: 'https://www.instagram.com/fraszczakp',
} as const;

// === SKILLS CONFIGURATION ===
export const SKILLS_CONFIG = [
  {
    id: 'html',
    orbitRadius: 100,
    size: 60,
    speed: 0.3,
    iconType: 'html' as const,
    phaseShift: 0,
    glowColor: 'cyan' as const,
    label: 'HTML5',
  },
  {
    id: 'css',
    orbitRadius: 100,
    size: 50,
    speed: 0.4,
    iconType: 'css' as const,
    phaseShift: (2 * Math.PI) / 3,
    glowColor: 'cyan' as const,
    label: 'CSS3',
  },
  {
    id: 'javascript',
    orbitRadius: 100,
    size: 50,
    speed: 0.4,
    iconType: 'javascript' as const,
    phaseShift: (4 * Math.PI) / 3,
    glowColor: 'cyan' as const,
    label: 'JavaScript',
  },
  {
    id: 'react',
    orbitRadius: 180,
    size: 40,
    speed: -0.3,
    iconType: 'react' as const,
    phaseShift: 0,
    glowColor: 'purple' as const,
    label: 'React',
  },
  {
    id: 'node',
    orbitRadius: 180,
    size: 40,
    speed: -0.3,
    iconType: 'node' as const,
    phaseShift: (2 * Math.PI) / 3,
    glowColor: 'purple' as const,
    label: 'Node.js',
  },
  {
    id: 'tailwind',
    orbitRadius: 180,
    size: 60,
    speed: -0.3,
    iconType: 'tailwind' as const,
    phaseShift: (4 * Math.PI) / 3,
    glowColor: 'purple' as const,
    label: 'Tailwind CSS',
  },
  {
    id: 'angular',
    orbitRadius: 120,
    size: 60,
    speed: 0.7,
    iconType: 'angular',
    phaseShift: 0,
    glowColor: 'red',
    label: 'Angular',
  },
  {
    id: 'typescript',
    orbitRadius: 150,
    size: 45,
    speed: -0.8,
    iconType: 'typescript',
    phaseShift: 45,
    glowColor: 'blue',
    label: 'TypeScript',
  },
  {
    id: 'dotnet',
    orbitRadius: 180,
    size: 40,
    speed: 0.7,
    iconType: 'dotnet',
    phaseShift: 90,
    glowColor: 'purple',
    label: '.NET / C#',
  },
  {
    id: 'cypress',
    orbitRadius: 140,
    size: 40,
    speed: 0.8,
    iconType: 'cypress',
    phaseShift: 135,
    glowColor: 'green',
    label: 'Cypress',
  },
  {
    id: 'azure',
    orbitRadius: 200,
    size: 40,
    speed: 0.5,
    iconType: 'azure',
    phaseShift: 180,
    glowColor: 'blue',
    label: 'Azure DevOps',
  },
  {
    id: 'sql',
    orbitRadius: 160,
    size: 45,
    speed: 0.6,
    iconType: 'sql',
    phaseShift: 225,
    glowColor: 'teal',
    label: 'SQL',
  },
  {
    id: 'jest',
    orbitRadius: 130,
    size: 45,
    speed: -0.6,
    iconType: 'jest',
    phaseShift: 270,
    glowColor: 'orange',
    label: 'Jest',
  },
] as const;

// === PAGE CONFIGURATIONS ===
export const HOME_PAGE = {
  author: 'Fraszczak Piotr',
  name: PERSONAL_INFO.firstName,
  surname: PERSONAL_INFO.lastName,
  description:
    'Pomagam firmom zamieniać pomysły w niezawodne aplikacje internetowe. Od backendu w Node.js czy .NET po frontend w Angular – dostarczam rozwiązania szybkie, bezpieczne i przyjazne użytkownikowi. Pasja do technologii i pracy zespołowej sprawia, że każdy projekt rozwijam z pełnym zaangażowaniem.',
  buttons: {
    portfolio: 'Zobacz Projekty',
    allProjects: 'Zobacz Wszystkie Projekty',
    contact: 'Kontakt',
  },
  image: PERSONAL_INFO.image,
  stats: [
    { icon: CodeBracketIcon, number: '10+', label: 'Projekty' },
    { icon: RocketLaunchIcon, number: '3+', label: 'Lat Doświadczenia' },
  ],
  projects: {
    title: 'Wybrane Projekty',
    description: 'Najnowsze realizacje z mojego portfolio',
    newestProjects: [
      {
        title: 'E-commerce Platform',
        description:
          'Nowoczesna platforma e-commerce z zaawansowanym systemem zarządzania produktami',
        image:
          'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      },
      {
        title: 'Task Management App',
        description:
          'Aplikacja do zarządzania projektami z real-time collaboration',
        image:
          'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
        tech: ['React', 'Socket.io', 'PostgreSQL'],
      },
    ],
  },
} as const;

export const ABOUT_PAGE = {
  title: 'O Mnie',
  description:
    'Od kilku lat zajmuję się tworzeniem oprogramowania, które pomaga firmom działać szybciej i sprawniej. Lubię łączyć technologię z praktycznym podejściem – od automatyzacji testów po optymalizację wydajności. W pracy stawiam na współpracę, dzielenie się wiedzą i rozwój nowych umiejętności.',
  experience: {
    title: 'Doświadczenie',
    experienceItems: [
      {
        year: '2023 - Present',
        title: 'Senior Software Developer',
        company: 'Nordea Bank Abp',
        description:
          'W Nordea głównie rozwijam aplikację bankowe do zarządzania kartami kredytowymi. Aplikacje są micro-fe w aplikacji bankowej. ' +
          'Bibliotekę komponentów tworzymy w Stencil.js ze storybookiem.Dużo pracuję z Angularem, poprawiam wydajność i testy, a przy okazji wspieram młodszych programistów i biorę udział w rekrutacjach.',
      },
      {
        year: '2021 - 2023',
        title: 'Software Developer',
        company: 'Sii Polska S.A.',
        description:
          'W Sii budowałem aplikacje webowe dla wewnętrznych użytkowników – backend w .NET i frontend w Angular. ' +
          'Była to świetna okazja, żeby blisko współpracować z QA i DevOps oraz tworzyć wspólne komponenty używane w różnych projektach.',
      },
      {
        year: '2019 - 2021',
        title: 'IT Technician',
        company: 'Sii Polska S.A.',
        description:
          'Zaczynałem jako technik IT, pomagając przy testowaniu nowych serwerów i konfiguracji systemów. ' +
          'To doświadczenie dało mi solidne podstawy w Linuxie i rozwiązywaniu problemów technicznych.',
      },
    ],
  },
  skills: {
    title: 'Umiejętności',
    skillsConfig: SKILLS_CONFIG,
  },
  achievements: [
    'Odbyte dziesiątki kursów i szkoleń 🚀',
    'Sporo podjętych decyzji technicznych w wielu projektach 🎯',
    'Mentoring i rekrutacja nowych talentów 🌱',
    'Prowadzenie warsztatów programowania 💻',
  ],
  hobby: {
    title: 'Poza Kodowaniem',
    description:
      'Kiedy nie koduję, możesz mnie znaleźć przed komputerem grając w Warcrafta 3 (tak, ta gra nadal jest świetna! 😄), ' +
      'na siłowni próbującego pobić swoje rekordy, albo zatopionego w jakiejś ciekawej książce. ' +
      'Od czasu do czasu dzielę się też swoją wiedzą prowadząc warsztaty dla początkujących programistów - uwielbiam patrzeć jak łapią bakcyla do kodowania!',
  },
} as const;

export const CONTACT_PAGE = {
  title: 'Skontaktuj się ze mną',
  description:
    'Masz pytania o moje usługi, chcesz współpracować lub po prostu porozmawiać o technologii? Napisz do mnie - chętnie odpowiem!',

  form: {
    title: 'Wyślij Wiadomość',
    fields: {
      name: {
        label: 'Imię *',
        placeholder: 'Twoje imię',
        required: true,
      },
      email: {
        label: 'Email *',
        placeholder: 'twoj@email.com',
        required: true,
      },
      subject: {
        label: 'Temat *',
        placeholder: 'Wybierz temat',
        required: true,
        options: [
          { value: '', label: 'Wybierz temat' },
          { value: 'cooperation', label: 'Współpraca' },
          { value: 'consultation', label: 'Konsultacje' },
          { value: 'course', label: 'Kursy i warsztaty' },
          { value: 'other', label: 'Inne' },
        ],
      },
      message: {
        label: 'Wiadomość *',
        placeholder: 'Opisz swoją wiadomość...',
        required: true,
        minLength: 10,
      },
    },
    submitButton: {
      text: 'Wyślij Wiadomość',
      submittingText: 'Wysyłanie...',
    },
    success: {
      title: 'Wiadomość Wysłana!',
      message:
        'Dziękuję za kontakt. Odpowiem na Twoją wiadomość w ciągu 24 godzin.',
    },
  },

  // Remove contactInfo section entirely
  // contactInfo: [...] - REMOVED

  socialLinks: [
    {
      name: 'LinkedIn',
      url: SOCIAL_LINKS.linkedin,
      color: 'bg-blue-600',
    },
    {
      name: 'GitHub',
      url: SOCIAL_LINKS.github,
      color: 'bg-gray-800',
    },
    {
      name: 'Twitter',
      url: SOCIAL_LINKS.twitter,
      color: 'bg-blue-400',
    },
    {
      name: 'Instagram',
      url: SOCIAL_LINKS.instagram,
      color: 'bg-pink-500',
    },
  ],

  newsletter: {
    title: 'Newsletter',
    description:
      'Otrzymuj najnowsze artykuły i informacje o kursach prosto na swój email.',
    buttonText: 'Zapisz się',
    placeholder: 'Twój email',
  },

  validation: {
    messages: {
      nameRequired: 'Imię jest wymagane',
      emailRequired: 'Email jest wymagany',
      emailInvalid: 'Email jest nieprawidłowy',
      subjectRequired: 'Temat jest wymagany',
      messageRequired: 'Wiadomość jest wymagana',
      messageMinLength: 'Wiadomość musi mieć co najmniej 10 znaków',
    },
  },
} as const;
