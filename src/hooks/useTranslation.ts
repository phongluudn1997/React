import * as React from 'react';

export const TranslationContext = React.createContext<{
  language: ILocale;
  changeLanguage: (lang: ILocale) => void;
  translation: (key: string) => string;
} | null>(null);

export type ILocale = 'en' | 'es';

export const useTranslation = () => {
  const context = React.useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
