import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GlassCard } from '../components/GlassCard';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="p-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring",
                stiffness: 100 
              }}
            >
              <MagnifyingGlassIcon className="w-24 h-24 text-slate-400 mx-auto mb-8" />
            </motion.div>
            
            <h1 className="text-8xl font-bold text-slate-800 dark:text-white mb-4">
              404
            </h1>
            
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
              Strona nie znaleziona
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Ups! Strona, której szukasz, nie istnieje lub została przeniesiona. 
              Sprawdź adres URL lub wróć do strony głównej.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Strona Główna
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-8 py-4 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 font-medium rounded-full hover:bg-white/30 dark:hover:bg-slate-700/30 transition-all duration-300"
              >
                Wróć
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}