import { components } from '@components/MDXComponents';
import Image from 'next/image';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { allBlogs } from 'contentlayer/generated';
import { formatDate } from '@lib/formatDate';
import clsx from 'clsx';
import clsxm from '@lib/clsxm';
import TableOfContents from '@components/TableOfContents/TableOfContents';

export async function getStaticPaths() {
  const paths = allBlogs.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const blog = allBlogs.find((post) => post.slug === slug);
  // console.log(999, blog);
  return {
    props: {
      blog,
    },
  };
}

export default function Post({ blog }) {
  const post = allBlogs.find((post) => post.slug === blog.slug);

  const Component = useMDXComponent(post.body.code);
  // console.log(888, post.body.code);

  return (
    <div className="relative flex justify-between mt-12 mb-12 xl:-ml-20 flex-row-reverse">
      <article className="max-w-3xl min-w-0 text-base lg:text-lg text-fore-subtle">
        <div className="mb-2 text-sm tracking-normal text-fore-subtle">
          <div>
            <header className="w-full font-inter mb-10">
              <h1 className="mb-4 text-4xl font-extrabold lg:text-5xl text-fore-primary">
                {post.title}
              </h1>
              <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                  <div className="flex items-center">
                    <time
                      className="ml-0 text-sm text-gray-700 dark:text-gray-300"
                      dateTime={post.publishedAt}
                    >
                      {post.author} / {formatDate(post.publishedAt)}
                    </time>
                  </div>
                </div>
                <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-gray-400 md:mt-0">
                  {post.wordCount} words • {post.readingTime.text}
                </p>
              </div>
            </header>
            <Component components={components} />
          </div>
        </div>
      </article>

      <aside className="sticky hidden h-screen max-w-xs mt-8 ml-6 top-16 xl:block">
        <TableOfContents/>
      </aside>
    </div>
  );
}
