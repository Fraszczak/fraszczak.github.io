import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartIcon } from "@heroicons/react/24/solid";
import { footerLinks } from "../../assets/config";
import { SoonTag } from "./SoonTag";

export function Footer() {
  // Helper function to check if item should be tagged
  const shouldTagItem = (itemName: string) => {
    return (
      itemName === "Kursy" ||
      itemName === "Warsztaty" ||
      itemName === "Portfolio"
    );
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-bold text-2xl mb-4 block">
              Fraszczak Piotr
            </Link>

            <div className="flex flex-col space-y-4">
              {footerLinks.Social.map((item) => (
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

          {/* Links */}
          {Object.entries(footerLinks)
            .slice(0, 2)
            .map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-lg mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((item) => (
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
            ))}

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-slate-400 mb-4">{footerLinks.newsletter.text}</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Twój email"
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
              © {new Date().getFullYear()} Fraszczak Piotr. Z{" "}
              <HeartIcon className="w-4 h-4 text-red-500 mx-1" />
              do kodu.
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
