import { useState } from "react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HomeFill from "./icons/HomeFill";
import PagesFill from './icons/PagesFill';
import WorkFill from './icons/WorkFill';
import InfoFill from './icons/InfoFill';
import ArrowUpwardFill from './icons/ArrowUpwardFill';
import AddCircleFill from './icons/AddCircleFill';
import ThemeSwitch from "./ThemeSwitch";

export function FloatMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className="fixed top-1/2 right-5 lg:right-10 flex flex-col items-end gap-4 rounded-xl origin-right z-30 ease-out group"
              initial={{ opacity: 0, x: 100, y: '-50%' }}
              animate={{ opacity: 1, x: 0, y: '-50%' }}
              exit={{ opacity: 0, x: 100, y: '-50%' }}
              transition={{ duration: 0.1, type: 'spring', stiffness: 50 }}
            >
              <Link
                href="/"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">Home</p>
                <HomeFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <Link
                href="/yuque"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">Yuque</p>
                <PagesFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <Link
                href="/blog"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">Blog</p>
                <WorkFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <Link
                href="/about"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">About</p>
                <InfoFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </Link>
              <m.button
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
                onClick={(e) => {
                  e.preventDefault();
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                  setIsOpen(false);
                }}
              >
                <p className="text-white">Back to top</p>
                <ArrowUpwardFill
                  className="block fill-neutral-900 bg-teal-300 rounded-xl p-3"
                  size="24px"
                />
              </m.button>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>

      <ThemeSwitch />

      <button
        className="fixed block overflow-y-hidden  lg:bottom-10  lg:right-10 p-4 bg-teal-300 rounded-xl hover:scale-110 transition active:scale-90 z-20 h-14 w-14 "
        onClick={toggle}
        id="fab-button"
        aria-labelledby="fab-button-label"
      >
        {/* <span id="fab-button-label" className="sr-only">
          Open menu
        </span>
        <AddCircleFill
          className={`${
            isOpen ? 'rotate-45' : ''
          } block fill-neutral-900 transition overflow-hidden`}
          size="2px"
        /> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 transition-colors dark:text-gray-100"
        >
          {isOpen && 'rotate-45' ? (
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          ) : (
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className="fixed inset-0 bg-neutral-900 bg-opacity-90 z-10"
              onClick={toggle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}
