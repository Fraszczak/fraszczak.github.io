export const pl = {
  // Meta and SEO
  meta: {
    title:
      'Piotr Fraszczak - Full-Stack Web Developer | React, Node.js, TypeScript',
    description:
      'Full-stack developer specjalizujący się w nowoczesnych aplikacjach webowych. React, Node.js, TypeScript, Angular. Tworzę szybkie, bezpieczne i przyjazne użytkownikowi rozwiązania.',
    keywords:
      'full-stack developer, React, Node.js, TypeScript, Angular, web development, programista, kursy programowania, konsultacje techniczne',
    author: 'Piotr Fraszczak',
  },

  // Navigation
  nav: {
    home: 'Strona główna',
    about: 'O mnie',
    portfolio: 'Portfolio',
    blog: 'Blog',
    courses: 'Kursy',
    contact: 'Kontakt',
  },

  // Home Page
  home: {
    title: 'Piotr Fraszczak',
    subtitle: 'Full-Stack Web Developer',
    description:
      'Pomagam firmom zamieniać pomysły w niezawodne aplikacje internetowe. Od backendu w Node.js czy .NET po frontend w Angular – dostarczam rozwiązania szybkie, bezpieczne i przyjazne użytkownikowi.',
    buttons: {
      portfolio: 'Zobacz Projekty',
      allProjects: 'Zobacz Wszystkie Projekty',
      contact: 'Kontakt',
    },
    stats: {
      projects: 'Projekty',
      experience: 'Lat Doświadczenia',
    },
    projects: {
      title: 'Wybrane Projekty',
      description: 'Najnowsze realizacje z mojego portfolio',
    },
  },

  // About Page
  about: {
    title: 'O Mnie',
    description:
      'Od kilku lat zajmuję się tworzeniem oprogramowania, które pomaga firmom działać szybciej i sprawniej. Lubię łączyć technologię z praktycznym podejściem – od automatyzacji testów po optymalizację wydajności.',
    experience: {
      title: 'Doświadczenie',
      items: [
        {
          year: '2023 - Present',
          title: 'Senior Software Developer',
          company: 'Nordea Bank Abp',
          description:
            'W Nordea głównie rozwijam aplikację bankowe do zarządzania kartami kredytowymi. Aplikacje są micro-fe w aplikacji bankowej. Bibliotekę komponentów tworzymy w Stencil.js ze storybookiem. Dużo pracuję z Angularem, poprawiam wydajność i testy, a przy okazji wspieram młodszych programistów i biorę udział w rekrutacjach.',
        },
        {
          year: '2021 - 2023',
          title: 'Software Developer',
          company: 'Sii Polska S.A.',
          description:
            'W Sii budowałem aplikacje webowe dla wewnętrznych użytkowników – backend w .NET i frontend w Angular. Była to świetna okazja, żeby blisko współpracować z QA i DevOps oraz tworzyć wspólne komponenty używane w różnych projektach.',
        },
        {
          year: '2019 - 2021',
          title: 'IT Technician',
          company: 'Sii Polska S.A.',
          description:
            'Zaczynałem jako technik IT, pomagając przy testowaniu nowych serwerów i konfiguracji systemów. To doświadczenie dało mi solidne podstawy w Linuxie i rozwiązywaniu problemów technicznych.',
        },
      ],
    },
    skills: {
      title: 'Umiejętności',
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
        'Kiedy nie koduję, możesz mnie znaleźć przed komputerem grając w Warcrafta 3 (tak, ta gra nadal jest świetna! 😄), na siłowni próbującego pobić swoje rekordy, albo zatopionego w jakiejś ciekawej książce. Od czasu do czasu dzielę się też swoją wiedzą prowadząc warsztaty dla początkujących programistów - uwielbiam patrzeć jak łapią bakcyla do kodowania!',
    },
  },

  // Contact Page
  contact: {
    title: 'Skontaktuj się ze mną',
    description:
      'Masz pytania o moje usługi, chcesz współpracować lub po prostu porozmawiać o technologii? Napisz do mnie - chętnie odpowiem!',
    form: {
      title: 'Wyślij Wiadomość',
      fields: {
        name: {
          label: 'Imię *',
          placeholder: 'Twoje imię',
        },
        email: {
          label: 'Email *',
          placeholder: 'twoj@email.com',
        },
        subject: {
          label: 'Temat *',
          placeholder: 'Wybierz temat',
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
    social: {
      title: 'Znajdź mnie w sieci',
    },
    newsletter: {
      title: 'Newsletter',
      description:
        'Otrzymuj najnowsze artykuły i informacje o kursach prosto na swój email.',
      buttonText: 'Zapisz się',
      placeholder: 'Twój email',
    },
    validation: {
      nameRequired: 'Imię jest wymagane',
      emailRequired: 'Email jest wymagany',
      emailInvalid: 'Email jest nieprawidłowy',
      subjectRequired: 'Temat jest wymagany',
      messageRequired: 'Wiadomość jest wymagana',
      messageMinLength: 'Wiadomość musi mieć co najmniej 10 znaków',
    },
  },

  // Footer
  footer: {
    navigation: 'Nawigacja',
    services: 'Usługi',
    social: 'Social',
    newsletter: 'Newsletter',
    copyright: 'Z',
    forCode: 'do kodu.',
    servicesList: {
      consultation: 'Konsultacje',
      cooperation: 'Współpraca',
      courses: 'Kursy',
      workshops: 'Warsztaty',
    },
  },

  // Common
  common: {
    loading: 'Ładowanie...',
    error: 'Błąd',
    notFound: 'Strona nie została znaleziona',
    backToHome: 'Powrót do strony głównej',
    comingSoon: 'Wkrótce',
    expectedLaunch: 'Planowane uruchomienie',
  },
  pages: {
    courses: {
      title: 'Kursy Programowania',
      description:
        'Już niedługo pojawią się tutaj moje autorskie kursy programowania. Będziemy razem poznawać najnowsze technologie webowe!',
      expectedDate: 'Q2 2025',
    },
    portfolio: {
      title: 'Portfolio',
      description:
        'Tutaj wkrótce pojawią się moje projekty wykorzystujące Angular, React, Node.js i inne nowoczesne technologie. Będzie co oglądać!',
      expectedDate: 'Q1 2025',
    },
  },
} as const;
