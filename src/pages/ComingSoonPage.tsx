import { motion } from "framer-motion";
import { ClockIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../contexts/I18nContext";

interface ComingSoonPageProps {
  title: string;
  description?: string;
  expectedDate?: string;
}

export function ComingSoonPage({
  title,
  description,
  expectedDate,
}: ComingSoonPageProps) {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Soon Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg mb-8"
        >
          <ClockIcon className="w-6 h-6" />
          <span>{t("common.comingSoon")}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        {/* Expected Date */}
        {expectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 mb-8"
          >
            <p className="text-slate-600 dark:text-slate-300">
              <strong>{t("common.expectedLaunch")}:</strong> {expectedDate}
            </p>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          {t("common.backToHome")}
        </motion.button>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400 rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
