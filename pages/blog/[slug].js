// import { allSlugs, formatSlug, getPostBySlug } from '../../lib/mdx';
import { formatDate } from '../../lib/formatDate';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { YuqueApi, Repo, Doc } from '../api/yuque-api';

import RemarkToc from 'remark-toc';
import RemarkSlug from 'remark-slug';
import rehypePrettyCode from 'rehype-pretty-code';


import TableOfContents from '../../components/TableOfContents'
import MDXComponents  from '../../components/MDXComponents/MDXComponents';




export default function Blog({ doc, mdxSource }) {
  const { title, updated_at } = doc;

  return (
    <>
      <h1 className="font-bold text-6xl mb-2">{title}</h1>
      <time dateTime={updated_at} className="text-lg font-medium">
        {formatDate(updated_at)}
      </time>
      <hr className="my-8" />

      <div className="mt-8 flex flex-col justify-between lg:flex-row">
        <article className="w-full lg:w-[640px]">
          <div className="prose prose-zinc w-full max-w-none dark:prose-invert">
            <MDXRemote {...mdxSource} components={MDXComponents} />
          </div>
        </article>
        <aside className="lg:min-w-[270px] lg:max-w-[270px]">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </>
  );
}


export const getStaticPaths = async () => {
  const api = new YuqueApi(process.env.YUQUE_TOKEN);

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [blogRepo] = repos.filter((repo) => repo.slug === process.env.REPO_SLUG);
  const { data: docs } = await api.getDocs(blogRepo.namespace);

  const paths = docs.filter((doc) => doc.status === 1).map((doc) => ({ params: { namespace: blogRepo.namespace, slug: doc.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { namespace, slug } }) => {
  const api = new YuqueApi(process.env.YUQUE_TOKEN);

  let nsp = namespace;

  if (!nsp) {
    const { data: currentUser } = await api.getUser();
    const { data: repos } = await api.getRepos(currentUser.login);
    const [blogRepo] = repos.filter((repo) => repo.slug === process.env.REPO_SLUG);

    nsp = blogRepo.namespace;
  }

  const { data: doc } = await api.getDoc(nsp, slug);
  const mdxSource = await serialize(doc.body, {
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
      doc,
      mdxSource,
    },
    revalidate: 10, // In seconds
  };
};
