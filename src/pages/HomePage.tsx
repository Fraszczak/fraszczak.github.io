import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { GlassCard } from "../components/GlassCard";
import { SoonTag } from "../components/SoonTag";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useI18n } from "../contexts/I18nContext";
import { PERSONAL_INFO } from "../../public/config";

export function HomePage() {
  useScrollToTop();
  const { t } = useI18n();

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
                {PERSONAL_INFO.lastName}{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {PERSONAL_INFO.firstName}
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                {t("home.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t("home.buttons.contact")}
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
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
                  src={PERSONAL_INFO.image}
                  alt={t("home.title")}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              <GlassCard className="p-8 text-center">
                <CodeBracketIcon className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  10+
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {t("home.stats.projects")}
                </p>
              </GlassCard>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="p-8 text-center">
                <RocketLaunchIcon className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                  3+
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {t("home.stats.experience")}
                </p>
              </GlassCard>
            </motion.div>
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
              {t("home.projects.title")}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              {t("home.projects.description")}
            </p>
          </motion.div>

          {/* Wrap the entire projects section with SoonTag */}
          <SoonTag disabled={true} className="block">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0 }}
              >
                <GlassCard className="overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="E-commerce Platform"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                      E-commerce Platform
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Modern e-commerce platform with advanced product
                      management system
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Node.js", "MongoDB", "Stripe"].map((tech) => (
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
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <GlassCard className="overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Task Management App"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                      Task Management App
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Project management application with real-time
                      collaboration
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Socket.io", "PostgreSQL"].map((tech) => (
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
            </div>

            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("home.buttons.allProjects")}
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </SoonTag>
        </div>
      </section>
    </div>
  );
}
