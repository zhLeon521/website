import { formatDate } from '@lib/formatDate';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import RemarkToc from 'remark-toc';
import RemarkSlug from 'remark-slug';

import TableOfContents from '@components/TableOfContents';
import { components } from '@components/MDXComponents';

import BlogListLayout from '@layout/BlogListLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { YuqueAPI } from '@pages/api/yuque-api';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeMetaAttribute from '@lib/rehype-meta-attribute';
import rehypeHighlightCode from '@lib/rehype-highlight-code';

import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import remarkGfm from 'remark-gfm';

export default function Blog({ doc, mdxSource }) {
  const { title, updated_at, word_count } = doc;
  return (

    <div className="relative flex justify-between mt-12 mb-12 xl:-mr-48 flex-row">
      <article className="max-w-3xl min-w-0 text-base lg:text-lg text-fore-subtle">
        <div className="mb-2 text-sm tracking-normal text-fore-subtle">
          <div>
            <header className="w-full font-inter mb-10">
              <h1 className="mb-4 text-4xl font-extrabold lg:text-5xl text-fore-primary">
                {title}
              </h1>
              <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                  <div className="flex items-center">
                    <time
                      className="ml-0 text-md text-gray-700 font-inter dark:text-gray-300"
                      dateTime={updated_at}
                    >
                      Zhong Leiyang / {formatDate(updated_at)}
                    </time>
                  </div>
                </div>
                <p className="min-w-32  text-md text-gray-600 dark:text-gray-400 ">
                  {word_count} words • {88888}
                </p>
              </div>
            </header>
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </div>
      </article>

      <aside className="sticky hidden h-screen max-w-xs mt-8 ml-6 top-16 xl:block">
        <TableOfContents />
      </aside>
    </div>
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
        remarkPlugins: [RemarkToc, RemarkSlug, remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          rehypeCodeTitles,
          rehypePrism,
          rehypeMetaAttribute,
          rehypeHighlightCode,
          rehypeAccessibleEmojis,
        ],
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
