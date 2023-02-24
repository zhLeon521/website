import React from 'react';

import { Headings } from '@types';

export const useHeadings = () => {
  const [headings, setHeadings] = React.useState<Headings>([]);

  React.useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(
        'article h1, article h2, article h3, article h4, article h5, article h6',
      ),
    )
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        title: element.textContent ?? '',
        level: Number(element.tagName.substring(1)),
      }));

    setHeadings(elements);
  }, []);
  // console.log(333, headings);
  return headings;
};
