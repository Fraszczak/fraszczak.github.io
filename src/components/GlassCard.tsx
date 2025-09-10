import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={`
        bg-white/20 dark:bg-slate-800/20 
        backdrop-blur-lg 
        border border-white/30 dark:border-slate-700/30 
        rounded-2xl 
        shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20
        ${hover ? 'hover:shadow-xl hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30' : ''}
        transition-all duration-300
        ${className}
      `}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}