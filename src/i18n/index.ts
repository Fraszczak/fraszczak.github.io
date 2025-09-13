export type Language = 'en' | 'pl';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'pl'];

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_NAMES = {
  en: 'English',
  pl: 'Polski',
} as const;

export const LANGUAGE_FLAGS = {
  en: '🇺🇸',
  pl: '🇵🇱',
} as const;
