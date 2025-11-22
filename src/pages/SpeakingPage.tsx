import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import { MicrophoneIcon, CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useI18n } from "../contexts/I18nContext";

export function SpeakingPage() {
  useScrollToTop();
  const { t } = useI18n();

  const upcomingTalks = (t("speaking.upcoming.items") as unknown) as any[];
  const pastTalks = (t("speaking.past.items") as unknown) as any[];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {t("speaking.title")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {t("speaking.description")}
          </p>
        </motion.div>

        {Array.isArray(upcomingTalks) && upcomingTalks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
              <CalendarIcon className="w-8 h-8 mr-3 text-indigo-500" />
              {t("speaking.upcoming.title")}
            </h2>
            <div className="space-y-6">
              {upcomingTalks.map((talk: any, index: number) => (
                <GlassCard key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                        {talk.title}
                      </h3>
                      <p className="text-indigo-500 font-medium mb-1">{talk.event}</p>
                      <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span className="mr-4">{talk.date}</span>
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        <span>{talk.location}</span>
                      </div>
                    </div>
                    {talk.link && (
                      <a
                        href={talk.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                      >
                        Szczegóły
                      </a>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
            <MicrophoneIcon className="w-8 h-8 mr-3 text-indigo-500" />
            {t("speaking.past.title")}
          </h2>
          {Array.isArray(pastTalks) && pastTalks.length > 0 ? (
            <div className="space-y-6">
              {pastTalks.map((talk: any, index: number) => (
                <GlassCard key={index} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                        {talk.title}
                      </h3>
                      <p className="text-indigo-500 font-medium mb-1">{talk.event}</p>
                      <div className="flex items-center text-slate-600 dark:text-slate-300 text-sm">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span>{talk.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                      {talk.slides && (
                        <a
                          href={talk.slides}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
                        >
                          Slajdy
                        </a>
                      )}
                      {talk.video && (
                        <a
                          href={talk.video}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
                        >
                          Wideo
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard className="p-8 text-center">
              <p className="text-slate-600 dark:text-slate-300">
                {t("speaking.past.empty")}
              </p>
            </GlassCard>
          )}
        </motion.section>
      </div>
    </div>
  );
}
