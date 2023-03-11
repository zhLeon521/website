// import { allSlugs, formatSlug, getPostBySlug } from '../../lib/mdx';
import { formatDate } from '@lib/formatDate';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import RemarkToc from 'remark-toc';
import RemarkSlug from 'remark-slug';
import rehypePrettyCode from 'rehype-pretty-code';

import TableOfContents from '@components/TableOfContents';
import MDXComponents from '@components/MDXComponents/MDXComponents';
import { components } from '@components/MDXComponents';

import BlogListLayout from '@layout/BlogListLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { YuqueAPI } from '@pages/api/yuque-api';

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
              <MDXRemote {...mdxSource} components={components} />
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
  const { data: getUserData } = await api.getUser();

  const { data: getDocsData } = await api.getDocs(getUserData.login, BLOG_NAME);

  // console.log(8866, getDocsData);

  const paths = getDocsData
    // .filter((doc) => doc.status === 1)
    .map((doc) => ({
      params: { slug: doc.slug },
    }));

  return {
    paths,
    fallback: false, // 表示如果页面未预渲染，则显示404页面。此选项适用于需要确保所有页面都是预渲染的站点。
    // 如果你有很多页面需要动态生成，可以使用 fallback: 'blocking' 参数指定页面是以阻塞方式生成的，这意味着在第一次访问时，页面将等待生成完成后再显示。
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  try {
    const api = new YuqueAPI(ACCESS_TOKEN);
    const { data: getUserData } = await api.getUser();

    const { data: doc } = await api.getDoc(getUserData.login, BLOG_NAME, slug);

    // console.log(999, doc.body);
    const mdxSource = await serialize(doc.body, {
      parseFrontmatter: true,
      mdxOptions: {
        // table of contents, important!!
        remarkPlugins: [RemarkToc, RemarkSlug],
        rehypePlugins: [rehypePrettyCode],
      },
    });
    // console.log(87878, mdxSource);
    // console.log(9999, doc.title);
    return {
      props: {
        doc,
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
