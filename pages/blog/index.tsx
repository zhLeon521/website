import Link from 'next/link';
import React from 'react';
// import { getAllPosts } from "../lib/mdx";
import { GetStaticProps } from 'next';
import { YuqueAPI } from '@pages/api/yuqueAPI';

import ThemeSwitch from '@components/ThemeSwitch';
import BlogListLayout from '@layout/BlogListLayout';

import PostCard from '@components/PostCard/PostCard';

import { IconSearch } from '@tabler/icons';

export default function Blog({ docs }) {
  const [searchValue, setSearchValue] = React.useState('');

  const filteredPosts = docs.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <BlogListLayout>
      <div className="mb-8 space-y-8">
        <h1 className="text-6xl font-bold mb-8">Blog Lists</h1>
        <hr className="my-8" />
        <div className="text-accent-5">已经发布了{docs.length}篇文章了</div>
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full rounded-full border border-accent-2 bg-hong-bg py-2 px-3 pl-12 transition-colors duration-200 ease-linear focus:border-accent-5 focus:outline-none"
            id="search"
          />
          <label htmlFor="search">
            <IconSearch
              className="absolute top-1/2 left-4 -translate-y-1/2"
              size={20}
            />
          </label>
        </div>
      </div>

      {!filteredPosts.length && (
        <div className="text-center text-xl">文章咱没搜到</div>
      )}

      <div className="grid grid-cols-1 gap-4 mx-0">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </BlogListLayout>
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

    // console.log(1121, getDocsData);

    return {
      props: {
        docs: getDocsData,
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
