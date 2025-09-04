import * as React from 'react';
import { type ILocale, useTranslation } from '../hooks/useTranslation.ts';

export const LocalChooser = () => {
  const { language, changeLanguage } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(event.target.value as ILocale);
  };

  return (
    <select
      name="local-chooser"
      id="local-chooser"
      className="m-4 p-2 border border-gray-300 rounded"
      value={language}
      onChange={handleChange}
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  );
};
