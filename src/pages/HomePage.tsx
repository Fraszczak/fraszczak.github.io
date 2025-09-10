import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { GlassCard } from "../components/GlassCard";

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 dark:text-white mb-6">
                Fraszczak{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Piotr
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Tworzę nowoczesne aplikacje webowe używając najnowszych
                technologii. Specjalizuję się w React, Node.js i architektury
                cloud-native.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Zobacz Projekty
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 font-medium rounded-full hover:bg-white/30 dark:hover:bg-slate-700/30 transition-all duration-300"
                >
                  Kontakt
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <img
                  src="assets/images/author.png"
                  alt="Fraszczak Piotr"
                  className="relative w-full h-full object-cover rounded-full shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: CodeBracketIcon, number: "50+", label: "Projekty" },
              {
                icon: RocketLaunchIcon,
                number: "5+",
                label: "Lat Doświadczenia",
              },
              { icon: CodeBracketIcon, number: "15+", label: "Technologie" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Wybrane Projekty
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Najnowsze realizacje z mojego portfolio
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "E-commerce Platform",
                description:
                  "Nowoczesna platforma e-commerce z React i Node.js",
                tech: ["React", "Node.js", "MongoDB"],
                image:
                  "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400",
              },
              {
                title: "Task Management App",
                description:
                  "Aplikacja do zarządzania projektami z real-time collaboration",
                tech: ["React", "Socket.io", "PostgreSQL"],
                image:
                  "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <Link
            to="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Zobacz Wszystkie Projekty
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
