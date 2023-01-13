import clsx from 'clsx';
import Github from './github.svg';
import Gitee from './gitee.svg';
import Mail from './mail.svg';

// Icons taken from: https://simpleicons.org/

type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const components: { [key: string]: SVGComponent } = {
  mail: Mail as SVGComponent,
  github: Github as SVGComponent,
  gitee: Gitee as SVGComponent,
};

type Props = {
  kind: 'mail' | 'github' | 'gitee' ;
  href: string;
};

const SocialIcon = ({ kind, href }: Props) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))) return null;

  const SocialSvg = components[kind];

  return (
    <a className="text-sm text-gray-500 transition-colors hover:text-gray-600" target="_blank" rel="noopener noreferrer" href={href}>
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={clsx(
          'h-6 w-6 fill-current text-gray-700 transition-colors dark:text-gray-200',
          kind === 'mail' && 'hover:text-primary-600 dark:hover:text-primary-400',
          kind === 'github' && 'hover:text-gray-500 dark:hover:text-gray-400',
          kind === 'gitee' && 'hover:text-[#4267B2] dark:hover:text-[#4267B2]',
        )}
      />
    </a>
  );
};

export default SocialIcon;
