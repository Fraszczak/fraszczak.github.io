import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import OrbitingSkills from "../components/Skills";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useI18n } from "../contexts/I18nContext";
import { SKILLS_CONFIG } from "../../public/config";

export function AboutPage() {
  useScrollToTop();
  const { t } = useI18n();

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {t("about.title")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("about.description")}
          </p>
        </motion.div>

        {/* Left Column - Experience */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
            <BriefcaseIcon className="w-8 h-8 mr-3 text-indigo-500" />
            {t("about.experience.title")}
          </h2>
          <div className="space-y-8">
            {t("about.experience.items").map((exp: any, index: number) => (
              <GlassCard key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {exp.title}
                  </h3>
                  <span className="text-indigo-500 font-medium">
                    {exp.year}
                  </span>
                </div>
                <h4 className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                  {exp.company}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column - Achievements */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 lg:mb-16 flex items-center">
              <TrophyIcon className="w-8 h-8 mr-3 text-indigo-500" />
              Osiągnięcia
            </h2>
            <div className="space-y-6">
              {t("about.achievements").map(
                (achievement: string, index: number) => (
                  <GlassCard key={index} className="p-8">
                    <div className="flex items-center">
                      <span className="text-slate-800 dark:text-white font-medium">
                        {achievement}
                      </span>
                    </div>
                  </GlassCard>
                )
              )}
            </div>
          </motion.section>

          {/* Right Column - Skills  */}
          <div className="space-y-6">
            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
                <AcademicCapIcon className="w-8 h-8 mr-3 text-indigo-500" />
                {t("about.skills.title")}
              </h2>
              <div className="rounded-lg">
                <OrbitingSkills skills={SKILLS_CONFIG} />
              </div>
            </motion.section>
          </div>
        </div>

        {/* Personal Touch - Full Width */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <GlassCard className="p-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
              {t("about.hobby.title")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("about.hobby.description")}
            </p>
          </GlassCard>
        </motion.section>
      </div>
    </div>
  );
}
