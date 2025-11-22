export const en = {
  // Meta and SEO
  meta: {
    title:
      'Piotr Fraszczak - Full-Stack Web Developer | React, Node.js, TypeScript',
    description:
      'Full-stack developer specializing in modern web applications. React, Node.js, TypeScript, Angular. I create fast, secure, and user-friendly solutions for businesses.',
    keywords:
      'full-stack developer, React, Node.js, TypeScript, Angular, web development, programmer, programming courses, technical consulting',
    author: 'Piotr Fraszczak',
  },

  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    portfolio: 'Portfolio',
    blog: 'Blog',
    courses: 'Courses',
    speaking: 'Speaking',
    contact: 'Contact',
  },

  // Home Page
  home: {
    title: 'Piotr Fraszczak',
    subtitle: 'Full-Stack Web Developer',
    description:
      'I help companies turn ideas into reliable web applications. From Node.js and .NET backends to Angular frontends – I deliver fast, secure, and user-friendly solutions.',
    buttons: {
      portfolio: 'View Projects',
      allProjects: 'View All Projects',
      contact: 'Contact',
    },
    stats: {
      projects: 'Projects',
      experience: 'Years Experience',
    },
    projects: {
      title: 'Featured Projects',
      description: 'Latest projects from my portfolio',
      items: [
        {
          title: 'E-commerce Platform',
          description:
            'Modern e-commerce platform with advanced product management system',
          image:
            'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
          tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        },
        {
          title: 'Task Management App',
          description:
            'Project management application with real-time collaboration',
          image:
            'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
          tech: ['React', 'Socket.io', 'PostgreSQL'],
        },
      ],
    },
  },

  // About Page
  about: {
    title: 'About Me',
    description:
      "For several years, I've been creating software that helps companies work faster and more efficiently. I like combining technology with a practical approach – from test automation to performance optimization.",
    experience: {
      title: 'Experience',
      items: [
        {
          year: '2023 - Present',
          title: 'Senior Software Developer',
          company: 'Nordea Bank Abp',
          description:
            'At Nordea, I mainly develop banking applications for credit card management. Applications are micro-frontends in the banking application. We create component libraries in Stencil.js with Storybook. I work a lot with Angular, improve performance and tests, and support junior developers and participate in recruitment.',
        },
        {
          year: '2021 - 2023',
          title: 'Software Developer',
          company: 'Sii Polska S.A.',
          description:
            'At Sii, I built web applications for internal users – backend in .NET and frontend in Angular. It was a great opportunity to work closely with QA and DevOps and create shared components used in various projects.',
        },
        {
          year: '2019 - 2021',
          title: 'IT Technician',
          company: 'Sii Polska S.A.',
          description:
            'I started as an IT technician, helping with testing new servers and system configuration. This experience gave me solid foundations in Linux and solving technical problems.',
        },
      ],
    },
    skills: {
      title: 'Skills',
    },
    achievements: {
      title: 'Achievements',
      items: [
        'Completed dozens of courses and training 🚀',
        'Many technical decisions made in various projects 🎯',
        'Mentoring and recruiting new talents 🌱',
        'Leading programming workshops 💻',
      ],
    },
    hobby: {
      title: 'Beyond Coding',
      description:
        "When I'm not coding, you can find me in front of the computer playing Warcraft 3 (yes, this game is still great! 😄), at the gym trying to beat my records, or immersed in some interesting book. From time to time, I also share my knowledge by leading workshops for beginner programmers - I love watching them catch the coding bug!",
    },
  },

  // Contact Page
  contact: {
    title: 'Get in Touch',
    description:
      "Have questions about my services, want to collaborate, or just chat about technology? Write to me - I'll be happy to respond!",
    form: {
      title: 'Send Message',
      fields: {
        name: {
          label: 'Name *',
          placeholder: 'Your name',
        },
        email: {
          label: 'Email *',
          placeholder: 'your@email.com',
        },
        subject: {
          label: 'Subject *',
          placeholder: 'Choose subject',
          options: [
            { value: '', label: 'Choose subject' },
            { value: 'cooperation', label: 'Cooperation' },
            { value: 'consultation', label: 'Consultation' },
            { value: 'course', label: 'Courses and workshops' },
            { value: 'other', label: 'Other' },
          ],
        },
        message: {
          label: 'Message *',
          placeholder: 'Describe your message...',
        },
      },
      submitButton: {
        text: 'Send Message',
        submittingText: 'Sending...',
      },
      success: {
        title: 'Message Sent!',
        message:
          'Thank you for contacting me. I will respond to your message within 24 hours.',
      },
    },
    social: {
      title: 'Find me online',
    },
    newsletter: {
      title: 'Newsletter',
      description:
        'Receive the latest articles and course information directly to your email.',
      buttonText: 'Subscribe',
      placeholder: 'Your email',
    },
    validation: {
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Email is invalid',
      subjectRequired: 'Subject is required',
      messageRequired: 'Message is required',
      messageMinLength: 'Message must be at least 10 characters',
    },
  },

  // Footer
  footer: {
    navigation: 'Navigation',
    services: 'Services',
    social: 'Social',
    newsletter: 'Newsletter',
    copyright: 'Made with',
    forCode: 'for code.',
    servicesList: {
      consultation: 'Consultation',
      cooperation: 'Cooperation',
      courses: 'Courses',
      workshops: 'Workshops',
    },
  },

  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    notFound: 'Page not found',
    backToHome: 'Back to Home',
    comingSoon: 'Coming Soon',
    expectedLaunch: 'Expected Launch',
  },
  pages: {
    courses: {
      title: 'Programming Courses',
      description:
        "My original programming courses will be available here soon. Together we'll explore the latest web technologies!",
      expectedDate: 'Q2 2025',
    },
    portfolio: {
      title: 'Portfolio',
      description:
        "Soon you'll find my projects here using Angular, React, Node.js and other modern technologies. There will be a lot to see!",
      expectedDate: 'Q1 2025',
    },

  },
  speaking: {
    title: 'Speaking',
    description:
      'My talks at conferences and meetups. I share knowledge about programming, architecture, and best practices.',
    upcoming: {
      title: 'Upcoming Talks',
      items: [],
    },
    past: {
      title: 'Past Talks',
      items: [],
      empty: 'No talks yet, but I am working on it! 🎤',
    },
  },
  skills: {
    html: 'HTML5',
    css: 'CSS3',
    javascript: 'JavaScript',
    react: 'React',
    node: 'Node.js',
    tailwind: 'Tailwind CSS',
    angular: 'Angular',
    typescript: 'TypeScript',
    dotnet: '.NET / C#',
    cypress: 'Cypress',
    azure: 'Azure DevOps',
    sql: 'SQL',
    jest: 'Jest',
  },
} as const;
