import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import { EyeIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Nowoczesna platforma e-commerce z zaawansowanym systemem zarządzania produktami",
    image:
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Fullstack",
    demo: "https://example.com",
    github: "https://github.com/example",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Aplikacja do zarządzania zadaniami z real-time collaboration",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    tech: ["React", "Socket.io", "PostgreSQL", "Docker"],
    category: "Fullstack",
    demo: "https://example.com",
    github: "https://github.com/example",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Dashboard pogodowy z wizualizacją danych i prognozą",
    image:
      "https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?auto=compress&cs=tinysrgb&w=600",
    tech: ["React", "D3.js", "Weather API", "Tailwind"],
    category: "Frontend",
    demo: "https://example.com",
    github: "https://github.com/example",
  },
  {
    id: 4,
    title: "REST API Service",
    description: "Skalowalne API dla aplikacji mobilnej z dokumentacją Swagger",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    category: "Backend",
    demo: "https://example.com",
    github: "https://github.com/example",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "Responsywna strona portfolio z animacjami i dark mode",
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    tech: ["React", "Framer Motion", "Tailwind", "Vite"],
    category: "Frontend",
    demo: "https://example.com",
    github: "https://github.com/example",
  },
  {
    id: 6,
    title: "Chat Application",
    description: "Real-time chat z grupami, emoji i udostępnianiem plików",
    image:
      "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=600",
    tech: ["React", "Socket.io", "Node.js", "Redis"],
    category: "Fullstack",
    demo: "https://example.com",
    github: "https://github.com/example",
  },
];

const categories = ["Wszystkie", "Frontend", "Backend", "Fullstack"];

export function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filteredProjects =
    selectedCategory === "Wszystkie"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

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
            Portfolio
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Wybrane projekty z mojego doświadczenia zawodowego i osobistego
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                  : "bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden group cursor-pointer">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <EyeIcon className="w-6 h-6" />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <CodeBracketIcon className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
