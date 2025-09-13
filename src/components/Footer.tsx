import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/solid";
import { SoonTag } from "./SoonTag";
import { useI18n } from "../contexts/I18nContext";

export function Footer() {
  const { t } = useI18n();

  // Helper function to check if item should be tagged
  const shouldTagItem = (itemName: string) => {
    return (
      itemName === t("footer.servicesList.courses") ||
      itemName === t("footer.servicesList.workshops") ||
      itemName === t("nav.portfolio")
    );
  };

  const navigationLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.portfolio"), href: "/portfolio" },
  ];

  const serviceLinks = [
    { name: t("footer.servicesList.consultation"), href: "/contact" },
    { name: t("footer.servicesList.cooperation"), href: "/contact" },
    { name: t("footer.servicesList.courses"), href: "/courses" },
    { name: t("footer.servicesList.workshops"), href: "/courses" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/12071995" },
    { name: "GitHub", href: "https://github.com/Fraszczak" },
    { name: "Twitter", href: "https://x.com/PPFraszczak" },
    { name: "Instagram", href: "https://www.instagram.com/fraszczakp" },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-bold text-2xl mb-4 block">
              Piotr Fraszczak
            </Link>

            <div className="flex flex-col space-y-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  {shouldTagItem(item.name) ? (
                    <SoonTag disabled={true}>
                      <span className="text-slate-400 cursor-not-allowed">
                        {item.name}
                      </span>
                    </SoonTag>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("footer.services")}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  {shouldTagItem(item.name) ? (
                    <SoonTag disabled={true}>
                      <span className="text-slate-400 cursor-not-allowed">
                        {item.name}
                      </span>
                    </SoonTag>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t("footer.newsletter")}
            </h3>
            <p className="text-slate-400 mb-4">
              {t("contact.newsletter.description")}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t("contact.newsletter.placeholder")}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-r-lg transition-colors duration-200">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-slate-400 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              © {new Date().getFullYear()} Piotr Fraszczak.{" "}
              {t("footer.copyright")}{" "}
              <HeartIcon className="w-4 h-4 text-red-500 mx-1" />
              {t("footer.forCode")}
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
