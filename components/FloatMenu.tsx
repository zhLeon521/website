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
import { IconPlus, IconX } from "@tabler/icons";

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
                href="/notion"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="flex flex-row gap-5 items-center group-hover:opacity-80 group-hover:hover:opacity-100 group-hover:hover:scale-110 transition group-hover:active:scale-90"
              >
                <p className="text-white">Notion</p>
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
        className="fixed block overflow-y-hidden  lg:bottom-10  lg:right-10 p-4 bg-teal-300 rounded-xl hover:scale-110 transition active:scale-90 z-20 h-14 w-14
         hover:bg-teal-200 dark:hover:bg-gray-800 "
        onClick={toggle}
        id="fab-button"
        aria-labelledby="fab-button-label"
      >
        {!isOpen ? <IconPlus /> : <IconX />}
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
