import { useI18n } from "../contexts/I18nContext";
import { LANGUAGE_NAMES, LANGUAGE_FLAGS, SUPPORTED_LANGUAGES } from "../i18n";

export function LanguageSwitcher() {
  const { language, changeLanguage } = useI18n();

  const handleLanguageChange = (newLanguage: string) => {
    console.log("LanguageSwitcher: Changing language to", newLanguage);
    changeLanguage(newLanguage as any);
  };

  return (
    <div className="flex items-center gap-1">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`p-2 rounded-lg text-lg transition-all duration-200 hover:scale-110 ${
            language === lang
              ? "bg-indigo-600 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
          title={LANGUAGE_NAMES[lang]}
        >
          {LANGUAGE_FLAGS[lang]}
        </button>
      ))}
    </div>
  );
}
