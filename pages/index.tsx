import Link from 'next/link';

import BlogListLayout from '@layout/BlogListLayout';

import PostCard from '@components/PostCard/PostCard';

import { GetStaticProps } from 'next';
import Hero from '@components/Hero';
import { Variants } from 'framer-motion';
import AnimatedHeading from '@components/FramerMotion/AnimatedHeading';
import { YuqueAPI } from '@pages/api/yuque-api';

export const headingFromLeft: Variants = {
  hidden: { x: -200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      stiffness: 70,
    },
  },
};

export function HomeHeading({ title }: { title: React.ReactNode | string }) {
  return (
    <AnimatedHeading
      className="w-full my-8  text-3xl tracking-wide font-bold text-left font-inter"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  );
}

export default function Home({ data }) {
  return (
    <>
      <Hero />

      <HomeHeading title="🎯 最新文章" />
      <div className="grid grid-cols-1 gap-4 mx-0">
        {data.slice(0, 5).map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}

        <Link
          href="/yuque"
          className="flex items-center justify-center gap-1 mt-6 text-lg transition border-transparent font-inter active:scale-95 active:border-black w-fit group "
        >
          Read all posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 ml-1 transition group-hover:translate-x-2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
            ></path>
          </svg>
        </Link>
      </div>
    </>
  );
}

const ACCESS_TOKEN = process.env.YUQUE_TOKEN; // 你的语雀访问令牌
const BLOG_NAME = process.env.REPO_SLUG;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const api = new YuqueAPI(ACCESS_TOKEN);
    const { data: getUserData } = await api.getUser();

    const { data: getDocsData } = await api.getDocs(
      getUserData.login,
      BLOG_NAME,
    );

    // console.log(2122, getDocsData);

    return {
      props: {
        data: getDocsData,
      },
      revalidate: 10, // 60 * 60 * 24 每天重新生成页面
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
