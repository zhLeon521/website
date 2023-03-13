import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { IconCheck, IconCopy } from '@tabler/icons';

import { copyToClipboard } from '@lib/copyToClipboard';

type Props = {
  children: JSX.Element;
  className: string;
};

export const Pre = ({ children, className, ...props }: Props): JSX.Element => {
  const preRef = useRef<HTMLPreElement>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  const onClick = async () => {
    if (preRef.current?.innerText) {
      copyToClipboard(preRef.current.innerText);
      setCopied(true);
    }
  };

  return (
    <div className="relative group">
      <pre
        {...props}
        ref={preRef}
        className={clsx(className, 'focus:outline-none')}
      >
        <div className="absolute flex items-center space-x-2 top-0 right-0 m-2">
          {/* <span
            className={clsx('hidden fade-in text-xs text-white', {
              'group-hover:flex': copied,
            })}
          >
            Copied!
          </span> */}

          <button
            type="button"
            aria-label="Copy to Clipboard"
            onClick={onClick}
            disabled={copied}
            className="absolute top-2 right-4 z-10 opacity-0 transition focus:outline-none group-hover:opacity-100"
          >
            {copied ? <IconCheck size={22} /> : <IconCopy size={22} />}
          </button>
        </div>

        {children}
      </pre>
    </div>
  );
};
