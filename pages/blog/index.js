import Link from 'next/link';
import React from 'react';
// import { getAllPosts } from "../lib/mdx";
import { YuqueApi, Repo, Doc } from '@/pages/api/yuque-api';

import ThemeSwitch from '@/components/ThemeSwitch';
import LayoutWrapper from '@/components/LayoutWrapper';

import PostCard from '@/components/PostCard/PostCard';

import { IconSearch } from '@tabler/icons';

export default function Blog({ docs }) {
  const [searchValue, setSearchValue] = React.useState('');

  const filteredPosts = docs.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <>
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

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const api = new YuqueApi(process.env.YUQUE_TOKEN);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const slug = repos.map((repo) => repo.slug);
  const [blogRepo] = repos.filter(
    (repo) => repo.slug === process.env.REPO_SLUG,
  );
  const { data: docs } = await api.getDocs(blogRepo.namespace);

  // console.log(10, repos);
  // console.log(11, slug);
  // console.log(12, blogRepo);
  // console.log(13, docs);

  return {
    props: {
      repo: blogRepo,
      docs: docs.filter((doc) => doc.status === 1),
    },
    revalidate: 10, // In seconds
  };
};
