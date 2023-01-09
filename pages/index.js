import Link from "next/link";
// import { getAllPosts } from "../lib/mdx";
import { formatDate } from "../lib/formatDate";
import { YuqueApi, Repo, Doc } from './api/yuque-api';


export default function Home({ docs }) {
  return (
    <>
      <h1 className="text-6xl font-bold mb-8">Blog</h1>
      <hr className="my-8" />
      <ul className="flex flex-col gap-3">
        {docs.map(({ slug, title, description, updated_at }) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`} className="border border-solid border-gray-300 rounded-lg shadow-md p-6 block">
                <div className="flex justify-between">
                  <h2>{title}</h2>
                  <time dateTime={updated_at}>{formatDate(updated_at)}</time>
                </div>
                <p className="mt-4">{description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}



export const getStaticProps= async () => {
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

