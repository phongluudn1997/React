import type { PropsWithChildren } from 'react';
import * as React from 'react';
import { type ILocale, TranslationContext } from '../hooks/useTranslation.ts';

const translations: Record<ILocale, { [key: string]: string }> = {
  en: {
    welcome: 'Welcome',
    goodbye: 'Goodbye',
  },
  es: {
    welcome: 'Bienvenido',
    goodbye: 'Adiós',
  },
};

export const TranslationProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = React.useState<ILocale>('en');
  const translation = (key: string) => {
    return translations[language][key] || key;
  };
  const changeLanguage = (lang: ILocale) => {
    setLanguage(lang);
  };
  return (
    <TranslationContext.Provider value={{ translation, language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};
