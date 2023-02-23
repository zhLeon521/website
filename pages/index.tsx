import Link from 'next/link';
// import { getAllPosts } from "../lib/mdx";

import BlogListLayout from '@/layout/BlogListLayout';

import PostCard from '@/components/PostCard/PostCard';

import axios from 'axios';
import { GetServerSideProps } from 'next';
import { YuqueAPI } from '@/pages/api/yuqueApi-new';
import Hero from '@/components/Hero';

export default function Home({ data }) {
  return (
    <>
      <Hero />

      <div className="grid gap-4 sm:grid-cols-2">
        {data.data.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </>
  );
}

const ACCESS_TOKEN = process.env.YUQUE_TOKEN; // 你的语雀访问令牌
const BLOG_NAME = process.env.REPO_SLUG;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const response = await axios.get(
    //   `https://www.yuque.com/api/v2/repos/blueheart/blog/docs`,
    //   {
    //     headers: {
    //       'X-Auth-Token': ACCESS_TOKEN, // 携带访问令牌的请求头
    //       'Content-Type': 'application/json', // 请求数据的 MIME 类型
    //     },
    //   },
    // );
    // const data = response.data;
    const api = new YuqueAPI(ACCESS_TOKEN);
    const getUserData = await api.getUser();
    const currentUser = getUserData.data.data;

    const response = await api.getDocs(currentUser.login, BLOG_NAME);
    const data = response.data;
    // console.log(1121, data);
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
