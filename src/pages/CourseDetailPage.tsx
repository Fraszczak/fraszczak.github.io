import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { 
  ArrowLeftIcon, 
  StarIcon, 
  ClockIcon, 
  UserGroupIcon, 
  CheckIcon,
  PlayIcon,
  DocumentTextIcon,
  TrophyIcon
} from '@heroicons/react/24/solid';

const courses = [
  {
    id: 1,
    title: 'React od Podstaw do Zaawansowanego',
    description: 'Kompletny kurs React.js z praktycznymi projektami i najnowszymi wzorcami.',
    longDescription: `Ten kompleksowy kurs React.js jest przeznaczony dla osób, które chcą opanować jeden z najpopularniejszych frameworków JavaScript. Niezależnie od tego, czy jesteś początkujący, czy masz już pewne doświadczenie, ten kurs przeprowadzi Cię przez wszystkie aspekty React - od podstaw po zaawansowane techniki.

    Kurs łączy teorię z praktycznymi projektami, dzięki czemu nie tylko nauczysz się składni, ale także zrozumiesz, jak stosować React w rzeczywistych projektach. Poznasz nowoczesne wzorce, najlepsze praktyki i najnowsze funkcje React 18.`,
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 299,
    originalPrice: 399,
    level: 'Początkujący',
    technology: 'React',
    format: 'Online',
    duration: '40 godzin',
    students: 1247,
    rating: 4.8,
    reviews: 156,
    featured: true,
    curriculum: [
      {
        title: 'Wprowadzenie do React',
        lessons: [
          'Czym jest React i dlaczego warto go używać',
          'Konfiguracja środowiska deweloperskiego',
          'Tworzenie pierwszej aplikacji React',
          'JSX - składnia i najlepsze praktyki'
        ]
      },
      {
        title: 'Komponenty i Props',
        lessons: [
          'Tworzenie komponentów funkcyjnych',
          'Props - przekazywanie danych',
          'Komponenty klasowe vs funkcyjne',
          'Kompozycja komponentów'
        ]
      },
      {
        title: 'State i Event Handling',
        lessons: [
          'Hook useState',
          'Obsługa zdarzeń',
          'Kontrolowane komponenty formularzy',
          'Walidacja formularzy'
        ]
      },
      {
        title: 'Efekty i cykl życia',
        lessons: [
          'Hook useEffect',
          'Pobieranie danych z API',
          'Cleanup i optymalizacja',
          'Custom hooks'
        ]
      },
      {
        title: 'Routing i nawigacja',
        lessons: [
          'React Router',
          'Zagnieżdżone ścieżki',
          'Programmatyczna nawigacja',
          'Zabezpieczanie ścieżek'
        ]
      },
      {
        title: 'Zarządzanie stanem',
        lessons: [
          'Context API',
          'useReducer Hook',
          'Wprowadzenie do Redux',
          'Zustand - nowoczesne zarządzanie stanem'
        ]
      },
      {
        title: 'Projekt końcowy',
        lessons: [
          'Planowanie aplikacji',
          'Implementacja funkcjonalności',
          'Testing i debugowanie',
          'Deployment i optymalizacja'
        ]
      }
    ],
    requirements: [
      'Podstawowa znajomość HTML i CSS',
      'Znajomość JavaScript (ES6+)',
      'Komputer z dostępem do internetu',
      'Edytor kodu (polecany VS Code)'
    ],
    whatYouLearn: [
      'Tworzenie nowoczesnych aplikacji React',
      'Zarządzanie stanem aplikacji',
      'Routing i nawigacja',
      'Integracja z API',
      'Testing komponentów',
      'Optymalizacja wydajności',
      'Deployment aplikacji',
      'Najlepsze praktyki React'
    ],
    testimonials: [
      {
        name: 'Anna Kowalska',
        role: 'Frontend Developer',
        content: 'Fantastyczny kurs! Dzięki niemu zrozumiałam React i mogłam zmienić pracę na lepszą.',
        rating: 5
      },
      {
        name: 'Michał Nowak',
        role: 'Fullstack Developer',
        content: 'Bardzo praktyczny kurs z wieloma przykładami. Polecam każdemu kto chce nauczyć się React.',
        rating: 5
      },
      {
        name: 'Katarzyna Wiśniewska',
        role: 'Junior Developer',
        content: 'Świetne wytłumaczenie trudnych konceptów. Instruktor ma dar przekazywania wiedzy.',
        rating: 5
      }
    ]
  },
  // Add other courses here...
];

export function CourseDetailPage() {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id || '0'));

  if (!course) {
    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Kurs nie znaleziony
          </h1>
          <Link
            to="/courses"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Wróć do kursów
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back to Courses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/courses"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Wróć do kursów
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium">
                      {course.format}
                    </span>
                    {course.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full text-sm font-medium">
                        Polecane
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                    {course.title}
                  </h1>
                  
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1" />
                      {course.students} uczniów
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(Math.floor(course.rating))}
                      <span className="ml-1">
                        {course.rating} ({course.reviews} opinii)
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* About Course */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
                  O kursie
                </h2>
                <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-slate-600 dark:prose-p:text-slate-300">
                  {course.longDescription?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <TrophyIcon className="w-8 h-8 mr-3 text-indigo-500" />
                  Czego się nauczysz
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouLearn?.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckIcon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                  <DocumentTextIcon className="w-8 h-8 mr-3 text-indigo-500" />
                  Program kursu
                </h2>
                <div className="space-y-6">
                  {course.curriculum?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border-l-4 border-indigo-500 pl-6">
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                        {moduleIndex + 1}. {module.title}
                      </h3>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center text-slate-600 dark:text-slate-300">
                            <PlayIcon className="w-4 h-4 text-indigo-500 mr-3" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
                  Opinie uczniów
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {course.testimonials?.map((testimonial, index) => (
                    <div key={index} className="bg-white/10 dark:bg-slate-800/10 rounded-xl p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mb-4 italic">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Purchase Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <GlassCard className="p-8 text-center">
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
                      {course.price} zł
                    </div>
                    {course.originalPrice > course.price && (
                      <div className="text-xl text-slate-500 line-through">
                        {course.originalPrice} zł
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-2xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4">
                    Kup Teraz
                  </button>
                  
                  <p className="text-sm text-slate-500 mb-4">
                    30-dniowa gwarancja zwrotu pieniędzy
                  </p>
                  
                  <div className="text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Poziom:</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Format:</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {course.format}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Czas trwania:</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-300">Uczniowie:</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {course.students}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <GlassCard className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                    Wymagania
                  </h3>
                  <ul className="space-y-2">
                    {course.requirements?.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                          {requirement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}