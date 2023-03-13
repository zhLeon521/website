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
    <div className="hidden lg:block text-fore-subtle">
      <h2 className="mb-4 flex items-center gap-4 font-normal text-accent tracking-widestest">
        TABLE OF CONTENTS
      </h2>

      <div>
        {headings.map((heading) => {
          const { id, level, title } = heading;

          return (
            <Link
              key={id}
              href={`#${id}`}
              className={clsxm(
                'block border-l-2 border-l-zinc-300 pt-[8px] pr-[20px] pb-[8px] text-sm leading-[1.2] text-accent-5 transition-all duration-300 hover:text-accent dark:border-l-zinc-700',
                {
                  ['border-l-accent text-accent font-medium text-md']:
                    id === activeId,
                },
              )}
              style={{
                paddingLeft:
                  level === 1 ? 10 : level === 2 ? 28 : level === 3 ? 50 : 2,
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
