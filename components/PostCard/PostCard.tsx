import Link from 'next/link';
import Image from '@/components/MDXComponents/Image';
import { formatDate } from '@/lib/formatDate';
import { useRef } from 'react';
import { Variants, animate, motion } from 'framer-motion';

const PostCard = (props) => {
  const { slug, title, cover, description, updated_at, word_count } = props;

  const BlogCardAnimation: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  };

  const blogRef = useRef(null);
  return (
    <motion.article
      ref={blogRef}
      variants={BlogCardAnimation}
      initial={animate && 'hidden'}
      whileInView={animate ? 'visible' : ''}
      whileHover={{ scale: 1.05 }}
      // viewport={{ once: true }}
      className="bg-white font-inter dark:bg-darkSecondary rounded-2xl p-2 flex flex-col sm:flex-row items-center w-full sm:w-[95%] mx-auto gap-2 md:gap-7 shadow-md md:shadow-lg"
    >
      <div className="w-full">
        <Image
          title={title}
          alt={title}
          src={cover ? cover : '/static/images/cover.png'}
          width={1200}
          height={630}
          quality={65}
          className="my-auto items-center transition-all duration-400 backdrop-blur-xl rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col w-full h-full px-2 pb-2 mt-2 sm:mt-0 sm:p-1 lg:py-5 md:pr-5">
        <Link
          href={`/blog/${slug}`}
          className="font-bold text-neutral-900 md:text-xl dark:text-neutral-200 hover:underline"
        >
          {title}
        </Link>
        <p className="mt-3 text-sm sm:text-xs md:text-sm  text-gray-600 dark:text-[#b5b7ba] line-clamp-3 sm:line-clamp-2 md:line-clamp-4 mb-2">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="z-10 flex items-center gap-3 font-barlow">
            <div className="w-[40px]">
              <Image
                alt="Jatin Sharma"
                height={933}
                width={933}
                src="/static/images/avatar.png"
                className="rounded-full !m-0 h-full"
              />
            </div>
            <div className="flex flex-col">
              <Link
                href="/about"
                className="text-sm font-bold hover:underline "
              >
                Zhong Leiyang
              </Link>
              <span className="text-xs">{formatDate(updated_at)}</span>
            </div>
          </div>
          <p className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-dark-3 md:text-sm">
            <span>{`${word_count}  words`}</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
