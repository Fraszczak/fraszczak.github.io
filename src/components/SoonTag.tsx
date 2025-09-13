import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";

interface SoonTagProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function SoonTag({
  children,
  className = "",
  disabled = true,
  onClick,
}: SoonTagProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      className={`
        relative inline-block group cursor-pointer
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      onClick={handleClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {/* Main content */}
      <div
        className={`
          relative px-4 py-2 rounded-lg transition-all duration-300
          ${
            disabled
              ? "bg-slate-700/50 text-slate-400"
              : "bg-indigo-600 hover:bg-indigo-700 text-white border border-indigo-500"
          }
        `}
      >
        {children}

        {/* Soon badge */}
        {disabled && (
          <motion.div
            className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg z-20"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              <span>Soon</span>
            </div>
          </motion.div>
        )}

        {/* Disabled overlay */}
        {disabled && (
          <motion.div
            className="absolute inset-0 bg-slate-900/20 rounded-lg backdrop-blur-[1px] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
        )}
      </div>

      {/* Tooltip */}
      {disabled && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-sm px-3 py-2 rounded-lg shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <div className="text-center">
            <div className="font-medium">Coming Soon!</div>
            <div className="text-xs text-slate-400 mt-1">
              This feature is in development
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </motion.div>
      )}
    </motion.div>
  );
}

// Alternative simpler version
export function SimpleSoonTag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div className="px-3 py-1 bg-slate-700/50 text-slate-400 rounded-md text-sm">
        {children}
      </div>
      {/* Disabled overlay for SimpleSoonTag */}
      <div className="absolute inset-0 bg-slate-900/20 rounded-md backdrop-blur-[1px] z-10" />
      <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium z-20">
        Soon
      </div>
    </div>
  );
}
