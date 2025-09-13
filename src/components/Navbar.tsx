import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { SoonTag } from "./SoonTag";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "../contexts/I18nContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavItem = (item: (typeof navItems)[0], isMobile = false) => {
    const baseClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
      location.pathname === item.path
        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

    const mobileClasses = `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 whitespace-nowrap ${
      location.pathname === item.path
        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

    if (item.comingSoon) {
      return (
        <SoonTag
          disabled={true}
          className={isMobile ? "block" : "inline-block"}
        >
          <span className={isMobile ? mobileClasses : baseClasses}>
            {item.name}
          </span>
        </SoonTag>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.path}
        className={isMobile ? mobileClasses : baseClasses}
        onClick={() => isMobile && setIsOpen(false)}
      >
        {item.name}
      </Link>
    );
  };

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.contact"), path: "/contact" },
    { name: t("nav.portfolio"), path: "/portfolio", comingSoon: true },
    { name: t("nav.courses"), path: "/courses", comingSoon: true },
  ];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/20 dark:border-slate-700/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-16">
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-baseline space-x-4 whitespace-nowrap">
              {navItems.map((item) => (
                <div key={item.name}>{renderNavItem(item)}</div>
              ))}
            </div>
          </div>

          {/* Language Switcher - Desktop - Right side */}
          <div className="hidden md:block absolute right-0">
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button - Left side */}
          <div className="md:hidden absolute left-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200/20 dark:border-slate-700/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <div key={item.name}>{renderNavItem(item, true)}</div>
              ))}

              {/* Language Switcher - Mobile */}
              <div className="pt-4 border-t border-slate-200/20 dark:border-slate-700/20">
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
