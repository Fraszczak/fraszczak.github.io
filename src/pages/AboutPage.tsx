import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { AcademicCapIcon, BriefcaseIcon, TrophyIcon } from '@heroicons/react/24/outline';

const experience = [
  {
    year: '2023 - Present',
    title: 'Senior Full-Stack Developer',
    company: 'Tech Innovation Co.',
    description: 'Leading development of cloud-native applications using React, Node.js, and AWS.',
  },
  {
    year: '2021 - 2023',
    title: 'Full-Stack Developer',
    company: 'Digital Solutions Ltd.',
    description: 'Developed and maintained multiple web applications and mobile apps.',
  },
  {
    year: '2019 - 2021',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    description: 'Created responsive user interfaces and improved user experience.',
  },
];

const skills = [
  'React & Next.js', 'Node.js & Express', 'TypeScript', 'Python',
  'AWS & Docker', 'PostgreSQL & MongoDB', 'GraphQL & REST APIs', 'CI/CD'
];

const achievements = [
  'AWS Certified Solutions Architect',
  'React Advanced Certification',
  'Published 15+ technical articles',
  'Speaker at 3 tech conferences'
];

export function AboutPage() {
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
            O Mnie
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Jestem pełnozmiennowym deweloperem z ponad 5-letnim doświadczeniem w tworzeniu 
            nowoczesnych aplikacji webowych. Specjalizuję się w technologiach JavaScript/TypeScript 
            oraz architekturach chmurowych.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
            <BriefcaseIcon className="w-8 h-8 mr-3 text-indigo-500" />
            Doświadczenie
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                    {exp.title}
                  </h3>
                  <span className="text-indigo-500 font-medium">{exp.year}</span>
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

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
            <AcademicCapIcon className="w-8 h-8 mr-3 text-indigo-500" />
            Umiejętności
          </h2>
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-3 text-center"
                >
                  <span className="text-slate-800 dark:text-white font-medium">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 flex items-center">
            <TrophyIcon className="w-8 h-8 mr-3 text-indigo-500" />
            Osiągnięcia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mr-4"></div>
                  <span className="text-slate-800 dark:text-white font-medium">
                    {achievement}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* Personal Touch */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlassCard className="p-8 text-center">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
              Poza Kodowaniem
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              W wolnym czasie uwielbiam fotografię krajobrazu, grę na gitarze oraz podróże. 
              Aktywnie uczestniczę w społeczności open-source i prowadzę warsztaty 
              programistyczne dla początkujących deweloperów.
            </p>
          </GlassCard>
        </motion.section>
      </div>
    </div>
  );
}