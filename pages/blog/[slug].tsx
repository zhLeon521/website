// import { allSlugs, formatSlug, getPostBySlug } from '../../lib/mdx';
import { formatDate } from '@/lib/formatDate';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import RemarkToc from 'remark-toc';
import RemarkSlug from 'remark-slug';
import rehypePrettyCode from 'rehype-pretty-code';

import TableOfContents from '@/components/TableOfContents';
import MDXComponents from '@/components/MDXComponents/MDXComponents';

import BlogListLayout from '@/layout/BlogListLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { YuqueAPI } from '@/pages/api/yuqueApi';

export default function Blog({ doc, mdxSource }) {
  const { title, updated_at } = doc;

  return (
    <BlogListLayout>
      <div>
        <h1 className="font-bold text-6xl mb-2">{title}</h1>
        <time dateTime={updated_at} className="text-lg font-medium">
          {formatDate(updated_at)}
        </time>
        <hr className="my-8" />

        <div className="mt-8 flex flex-col justify-between lg:flex-row">
          <article className="w-full lg:w-[720px]">
            <div className="prose prose-zinc pr-20 w-full max-w-none dark:prose-invert">
              <MDXRemote {...mdxSource} components={MDXComponents} />
            </div>
          </article>
          <aside className="lg:max-w-[270px]">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </BlogListLayout>
  );
}

const ACCESS_TOKEN = process.env.YUQUE_TOKEN; // 你的语雀访问令牌
const BLOG_NAME = process.env.REPO_SLUG;
export const getStaticPaths: GetStaticPaths = async () => {
  const api = new YuqueAPI(ACCESS_TOKEN);
  const getUserData = await api.getUser();
  const currentUser = getUserData.data.data;

  const response = await api.getDocs(currentUser.login, BLOG_NAME);
  const data = response.data;
  // console.log(2222, blogRepo);
  /**
   *  {
  id: 727398,
  type: 'Book',
  slug: 'blog',
  name: 'BLUEHEART',
  user_id: 726433,
  description: '梦为努力浇了水，爱在背后往前推',
  creator_id: 726433,
  public: 1,
  items_count: 16,
  likes_count: 0,
  watches_count: 1,
  content_updated_at: '2022-11-07T10:48:17.602Z',
  updated_at: '2023-01-03T13:19:08.000Z',
  created_at: '2020-02-04T09:35:56.000Z',
  namespace: 'blueheart/blog',
  user: {
    id: 726433,
    type: 'User',
    login: 'blueheart',
    name: 'zhLeon521',
    description: '梦为努力浇了水，爱在背后往前推',
    avatar_url: 'https://cdn.nlark.com/yuque/0/2020/png/726433/1580361667870-avatar/39c8ad5b-bdf8-42c2-a8ce-fc37a3596ed0.png',
    followers_count: 28,
    following_count: 0,
    created_at: '2020-01-06T14:12:31.000Z',
    updated_at: '2023-02-09T11:52:43.000Z',
    _serializer: 'v2.user'
  },
  _serializer: 'v2.book'
}
   *
   */

  const paths = data.data.map((doc) => ({
    params: { slug: doc.slug },
  }));
  // console.log(1231, paths);
  /**
  [ { params: { namespace: 'blueheart/blog', slug: 'of6rug' } },
  { params: { namespace: 'blueheart/blog', slug: 'revsog' } },
  { params: { namespace: 'blueheart/blog', slug: 'hlckeg' } },
  { params: { namespace: 'blueheart/blog', slug: 'lfx6kp' } },]
   */

  return {
    paths,
    fallback: true, // 未生成的页面在首次访问时生成
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  try {
    const api = new YuqueAPI(ACCESS_TOKEN);
    const getUserData = await api.getUser();
    const currentUser = getUserData.data.data;

    const { data: doc } = await api.getDoc(currentUser.login, BLOG_NAME, slug);

    // console.log(999, doc.data.body);
    const mdxSource = await serialize(doc.data.body, {
      parseFrontmatter: true,
      mdxOptions: {
        // table of contents, important!!
        remarkPlugins: [RemarkToc, RemarkSlug],
        rehypePlugins: [rehypePrettyCode],
      },
    });
    // console.log(87878, mdxSource);
    // console.log(9999, doc);
    return {
      props: {
        doc: doc.data,
        mdxSource,
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
