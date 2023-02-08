import Link from 'next/link';
import React from 'react';
// import { getAllPosts } from "../lib/mdx";
import { formatDate } from '../../lib/formatDate';
import { YuqueApi, Repo, Doc } from '../api/yuque-api';

import ThemeSwitch from '../../components/ThemeSwitch';
import LayoutWrapper from '../../components/LayoutWrapper';

import { IconSearch } from '@tabler/icons';
import Image from '../../components/MDXComponents/Image';

export default function Home({ docs }) {
  const postTitle = docs.map((item) => item.title);
  // console.log(323, postTitle);
  // https://www.yuque.com/api/zsearch?limit=21&p=1&q=024&scope=blueheart%2Fblqlhn&sence=modal&tab=book&type=content

  return (
    <>
      <h1 className="text-6xl font-bold mb-8">Blog Lists</h1>
      <hr className="my-8" />
      <div className="mb-8 space-y-8">
        <p className="text-accent-5">已经发布了{docs.length}篇文章了</p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {docs.map(({ slug, title, description, updated_at, likes_count }) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="flex flex-col space-y-3 rounded-2xl border border-accent-2 p-6 transition-all duration-300 hover:scale-105 hover:bg-accent-1"
            >
              <Image src="/static/images/cover.png" width={1280} height={720} alt={title} rounded="rounded-lg" />

              <div className="flex-grow space-y-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-4 text-accent-5">{description}</p>
              </div>

              <div className="flex items-center text-sm">
                {formatDate(updated_at)}
                &nbsp;/&nbsp;
                {`${likes_count} likes`}
                &nbsp;/&nbsp;
                {`9999 views`}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps = async () => {
  const api = new YuqueApi(process.env.YUQUE_TOKEN);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const slug = repos.map((repo) => repo.slug);
  const [blogRepo] = repos.filter((repo) => repo.slug === process.env.REPO_SLUG);
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
