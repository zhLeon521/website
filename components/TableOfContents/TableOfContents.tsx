// import { IconList } from '@tabler/icons'
import React from 'react';

import clsxm from '@lib/clsxm';
import { useHeadings, useScrollspy } from '@hooks';
import { IconList } from '@tabler/icons';

import Link from '../Link';

const TableOfContents = () => {
  const headings = useHeadings();
  const activeId = useScrollspy(
    headings.map((heading) => heading.id),
    { rootMargin: '0% 0% -90% 0%' },
  );

  return (
    <div className="hidden lg:block">
      <div className="mb-4 flex items-center gap-4">
        <IconList size={18} />
        <div>Table of contents</div>
      </div>
      <div>
        {headings.map((heading) => {
          const { id, level, title } = heading;

          return (
            <Link
              key={id}
              href={`#${id}`}
              className={clsxm(
                'block border-l-2 border-l-zinc-300 pt-[10px] pr-[10px] pb-[10px] text-sm leading-[1.2] text-accent-5 transition-all duration-300 hover:text-red-500 dark:border-l-zinc-700',
                {
                  ['border-l-red-500 text-red-500 dark:border-l-red-600 font-bold text-md']:
                    id === activeId,
                },
              )}
              style={{
                paddingLeft: level * 16,
              }}
              animation={false}
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TableOfContents;
