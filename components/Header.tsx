import Link from '@/components/Link';
import ThemeSwitch from '@/components/ThemeSwitch';
import { headerConfigs } from '@/config/header_links';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 shadow-sm saturate-[1.8] backdrop-blur-[10px] dark:bg-black/50 dark:saturate-100">
      <div className="mx-auto flex h-[60px] max-w-5xl items-center justify-between px-2">
        <div>
          <Link href="/" aria-label={headerConfigs.title}>
            <div className="flex items-center justify-between font-sarina">
              <div className="h-6 text-2xl font-semibold sm:block">
                {headerConfigs.title}
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center font-inter text-lg leading-5 sm:gap-1">
          <div className="hidden gap-1 sm:flex">
            {headerConfigs.navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="rounded py-2 px-3 text-sm font-medium transition-colors duration-300"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
