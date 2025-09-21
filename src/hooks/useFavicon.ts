import * as React from 'react';

export const useFavicon = (url: string) => {
  React.useEffect(() => {
    const existedLink = document.querySelector<HTMLLinkElement>(`link[rel~="icon"]`);
    if (!existedLink) {
      const newLink = document.createElement('link');
      newLink.type = 'image/x-icon';
      newLink.rel = 'icon';
      newLink.href = url;
      document.head.appendChild(newLink);
    } else {
      existedLink.href = url;
    }
  }, [url]);
};
