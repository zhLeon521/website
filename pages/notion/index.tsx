import { getDatabase, convertToArticleList } from '../api/notion-api';
import Article from '@components/Article';

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ articles }) {
  // console.log(99, articles);
  return (
    <>
      {articles.map((post) => {
        console.log(22, post);
        const date = new Date(post.publishedDate).toLocaleString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        });
        return (
          <Article
            key={post.id}
            title={post.title}
            date={date}
            summary={post.summary}
          />
        );
      })}
    </>
  );
}

export const getStaticProps = async () => {
  // 从 Notion 数据库中获取数据
  const database = await getDatabase(databaseId);
  // console.log(999, database);

  // 将 Notion 数据转换为所需的文章列表和标签列表
  const { articles, tags } = convertToArticleList(database);

  // 只选择公开的文章
  const blogArticles = articles.filter((article) => article.isPublic === true);
  // console.log(9090, blogArticles);

  // 选择第一篇文章作为特色文章
  const featuredArticle = blogArticles[0];
  // console.log(3434, featuredArticle);

  return {
    props: {
      featuredArticle,
      articles: blogArticles.slice(0),
      tags,
    },
    // 每 30 秒重新验证数据库
    revalidate: 30,
  };
};
