import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Language, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "../i18n";
import { en } from "../i18n/translations/en";
import { pl } from "../i18n/translations/pl";

const translations = {
  en,
  pl,
} as const;

interface I18nContextType {
  language: Language;
  t: (key: string) => string;
  changeLanguage: (newLanguage: Language) => void;
  isRTL: boolean;
  isInitialized: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language on client side
  useEffect(() => {
    const initializeLanguage = () => {
      try {
        // Try to get language from localStorage first
        const saved = localStorage.getItem("language") as Language;
        if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
          setLanguage(saved);
          setIsInitialized(true);
          return;
        }

        // Fallback to browser language
        const browserLang = navigator.language.split("-")[0] as Language;
        if (SUPPORTED_LANGUAGES.includes(browserLang)) {
          setLanguage(browserLang);
          setIsInitialized(true);
          return;
        }

        // Default fallback
        setLanguage(DEFAULT_LANGUAGE);
        setIsInitialized(true);
      } catch (error) {
        console.warn("Failed to initialize language:", error);
        setLanguage(DEFAULT_LANGUAGE);
        setIsInitialized(true);
      }
    };

    initializeLanguage();
  }, []);

  const t = useCallback(
    (key: string) => {
      if (!isInitialized) {
        return key; // Return key as fallback during initialization
      }

      const keys = key.split(".");
      let value: any = translations[language];

      for (const k of keys) {
        value = value?.[k];
      }

      return value || key;
    },
    [language, isInitialized]
  );

  const changeLanguage = useCallback((newLanguage: Language) => {
    console.log("Changing language to:", newLanguage); // Debug log
    setLanguage(newLanguage);

    try {
      localStorage.setItem("language", newLanguage);
    } catch (error) {
      console.warn("Failed to save language to localStorage:", error);
    }

    // Update HTML lang attribute
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLanguage;
      updateMetaTags(newLanguage);
    }
  }, []);

  const value: I18nContextType = {
    language,
    t,
    changeLanguage,
    isRTL: false,
    isInitialized,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

function updateMetaTags(language: Language) {
  if (typeof document === "undefined") return;

  const translations = language === "en" ? en : pl;

  // Update title
  document.title = translations.meta.title;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", translations.meta.description);
  }

  // Update meta keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute("content", translations.meta.keywords);
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", translations.meta.title);
  }

  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  if (ogDescription) {
    ogDescription.setAttribute("content", translations.meta.description);
  }

  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute("content", translations.meta.title);
  }

  const twitterDescription = document.querySelector(
    'meta[name="twitter:description"]'
  );
  if (twitterDescription) {
    twitterDescription.setAttribute("content", translations.meta.description);
  }
}
