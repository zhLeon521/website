import Link from '@components/Link/Link';
import Image from '@components/MDXComponents/Image';
import { renderCanvas } from './renderCanvas';

import { AnimatedSVGBack } from './AnimatedSVGBG';

import { motion, Variants } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import Marquee from 'react-fast-marquee';

const FadeContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.1 },
  },
};

const opacityVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
};

export const popUp: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
    },
  },
};

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderCanvas();
    if (ref.current) {
      ref.current?.classList.add('transition-in');
    }
  }, []);

  return (
    <div  className='pb-10'>
      <AnimatedSVGBack className="absolute top-0 left-1/2 -translate-x-1/2 hidden md:block" />
      <canvas className=" pointer-events-none absolute inset-0" id="canvas" />
      <div ref={ref} className="relative max-w-5xl mx-auto ">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid min-h-screen p-20 place-content-center"
        >
          <div className="relative flex flex-col items-center w-full gap-10 mx-auto">
            <motion.div
              variants={popUp}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative flex items-center justify-center p-2 rounded-full w-52 h-52 before:absolute before:inset-0 before:border-t-4 before:border-b-4 before:border-black before:dark:border-white before:rounded-full before:animate-photo-spin"
            >
              <Image
                src="/static/images/avatar.png"
                width={933}
                height={933}
                alt="avatar zhongleiyang"
                rounded="rounded-full"
                loading="eager"
              />
            </motion.div>

            <div className="flex flex-col w-full gap-4 p-5 text-center select-auto ">
              <div className="flex flex-col gap-4">
                <motion.h1
                  variants={opacityVariant}
                  className="text-5xl font-bold lg:text-6xl font-sarina"
                >
                  Zhong Leiyang
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-semibold text-lg font-inter text-[#383838] dark:text-gray-200"
                >
                  React Developer, Competitive Programmer, Full-stack Web
                  Development Student
                </motion.p>
              </div>

              <motion.p
                variants={opacityVariant}
                className=" text-[#474747] font-barlow dark:text-gray-300 font-medium text-base text-center"
              >
                I am a student, currently learning web development skills such
                as Next.js, React.js, Tailwindcss, and database management. I
                can feel a sense of accomplishment when my code is recognized
                and appreciated.
              </motion.p>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="fixed  px-5 overflow-x-hidden text-neutral-900 uppercase h-12 font-heading text-3xl font-bold bg-teal-300 tracking-wide marquee-container">
        <Marquee gradientColor={[23, 23, 23]} gradientWidth={'200'}>
          <span className="  px-2 text-2xl">
            WE CHOOSE TO GO TO THE MOON IN THIS DECADE AND DO THE OTHER THINGS,
            NOT BECAUSE THEY ARE EASY, BUT BECAUSE THEY ARE HARD.
          </span>
        </Marquee>
      </div>
    </div>
  );
};

export default Hero;
