import { useTranslation } from '../hooks/useTranslation.ts';

export const Translation = () => {
  const { translation } = useTranslation();
  return <div>{translation('welcome')}</div>;
};
