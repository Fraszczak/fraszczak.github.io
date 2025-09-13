import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import {
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

const courses = [
  {
    id: 1,
    title: "React od Podstaw do Zaawansowanego",
    description:
      "Kompletny kurs React.js z praktycznymi projektami i najnowszymi wzorcami.",
    image:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 299,
    originalPrice: 399,
    level: "Początkujący",
    technology: "React",
    format: "Online",
    duration: "40 godzin",
    students: 1247,
    rating: 4.8,
    reviews: 156,
    featured: true,
  },
  {
    id: 2,
    title: "Node.js i Express - Budowa API",
    description:
      "Naucz się tworzyć skalowalne backend aplikacje z Node.js i Express.",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 249,
    originalPrice: 329,
    level: "Średniozaawansowany",
    technology: "Node.js",
    format: "Online",
    duration: "32 godziny",
    students: 834,
    rating: 4.7,
    reviews: 98,
    featured: false,
  },
  {
    id: 3,
    title: "TypeScript w Praktyce",
    description: "Opanuj TypeScript i pisz bezpieczniejszy kod JavaScript.",
    image:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 199,
    originalPrice: 279,
    level: "Średniozaawansowany",
    technology: "TypeScript",
    format: "Online",
    duration: "24 godziny",
    students: 567,
    rating: 4.9,
    reviews: 78,
    featured: true,
  },
  {
    id: 4,
    title: "Full-Stack Development Bootcamp",
    description:
      "Intensywny warsztat obejmujący frontend, backend i deployment.",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 899,
    originalPrice: 1199,
    level: "Zaawansowany",
    technology: "Full-Stack",
    format: "Warsztat",
    duration: "3 dni",
    students: 289,
    rating: 4.9,
    reviews: 67,
    featured: true,
  },
  {
    id: 5,
    title: "Docker dla Developerów",
    description:
      "Praktyczne użycie Docker w procesie developmentu i deploymentu.",
    image:
      "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 179,
    originalPrice: 229,
    level: "Początkujący",
    technology: "DevOps",
    format: "Online",
    duration: "16 godzin",
    students: 423,
    rating: 4.6,
    reviews: 52,
    featured: false,
  },
  {
    id: 6,
    title: "GraphQL i Apollo Client",
    description: "Nowoczesne API z GraphQL i integracja z React aplikacjami.",
    image:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 219,
    originalPrice: 289,
    level: "Zaawansowany",
    technology: "GraphQL",
    format: "Online",
    duration: "20 godzin",
    students: 312,
    rating: 4.7,
    reviews: 41,
    featured: false,
  },
];

const levels = [
  "Wszystkie",
  "Początkujący",
  "Średniozaawansowany",
  "Zaawansowany",
];
const technologies = [
  "Wszystkie",
  "React",
  "Node.js",
  "TypeScript",
  "Full-Stack",
  "DevOps",
  "GraphQL",
];
const formats = ["Wszystkie", "Online", "Warsztat"];

export function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState("Wszystkie");
  const [selectedTechnology, setSelectedTechnology] = useState("Wszystkie");
  const [selectedFormat, setSelectedFormat] = useState("Wszystkie");

  const filteredCourses = courses.filter((course) => {
    const matchesLevel =
      selectedLevel === "Wszystkie" || course.level === selectedLevel;
    const matchesTechnology =
      selectedTechnology === "Wszystkie" ||
      course.technology === selectedTechnology;
    const matchesFormat =
      selectedFormat === "Wszystkie" || course.format === selectedFormat;
    return matchesLevel && matchesTechnology && matchesFormat;
  });

  const featuredCourses = courses.filter((course) => course.featured);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key="half" className="w-5 h-5 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarOutlineIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-6">
            Kursy i Warsztaty
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Rozwijaj swoje umiejętności z praktycznymi kursami programowania
          </p>
        </motion.div>

        {/* Featured Courses */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">
            Polecane Kursy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/courses/${course.id}`}>
                  <GlassCard className="overflow-hidden group h-full">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Polecane
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded">
                          {course.level}
                        </span>
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded">
                          {course.format}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {course.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1">
                        {course.description}
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {course.duration}
                          </div>
                          <div className="flex items-center">
                            <UserGroupIcon className="w-4 h-4 mr-1" />
                            {course.students} uczniów
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {renderStars(course.rating)}
                            <span className="text-sm text-slate-500 ml-1">
                              ({course.reviews})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-slate-800 dark:text-white">
                              {course.price} zł
                            </span>
                            {course.originalPrice > course.price && (
                              <span className="text-sm text-slate-500 line-through ml-2">
                                {course.originalPrice} zł
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 space-y-6"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            Wszystkie Kursy
          </h2>

          {/* Level Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Poziom:
            </h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedLevel === level
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Technology Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Technologia:
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTechnology(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedTechnology === tech
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Format Filter */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Format:
            </h3>
            <div className="flex flex-wrap gap-2">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedFormat === format
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={`/courses/${course.id}`}>
                <GlassCard className="overflow-hidden group h-full">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {course.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Polecane
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <PlayIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded">
                        {course.level}
                      </span>
                      <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded">
                        {course.format}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {course.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-4 flex-1">
                      {course.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="w-4 h-4 mr-1" />
                          {course.students} uczniów
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {renderStars(course.rating)}
                          <span className="text-sm text-slate-500 ml-1">
                            ({course.reviews})
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-slate-800 dark:text-white">
                            {course.price} zł
                          </span>
                          {course.originalPrice > course.price && (
                            <span className="text-sm text-slate-500 line-through ml-2">
                              {course.originalPrice} zł
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Nie znaleziono kursów spełniających wybrane kryteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
