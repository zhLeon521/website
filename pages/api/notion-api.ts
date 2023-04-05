import { Client } from '@notionhq/client';
import slugify from 'slugify';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});



/**
 * 从 Notion 数据库中获取文章列表
 * @param {string} databaseId 数据库 ID
 * @returns {Promise<Array>} 返回文章列表
 */
export const getDatabase = async (databaseId) => {
  // 调用 Notion API 查询数据库中的文章数据
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'Status',
          select: {
            equals: '✅ Published',
          },
        },
        {
          property: 'Status',
          select: {
            equals: '✏️ Draft',
          },
        },
      ],
    },
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
  });

  // 返回查询结果中的文章列表
  return response.results;
};

// 将Notion数据库查询结果转换为文章列表和标签列表
export const convertToArticleList = (tableData) => {
  // 初始化 tags 数组
  let tags = [];
  // 遍历文章数据并转换为自定义格式
  const articles = tableData.map((article) => {
    // 获取文章标题
    const title = article.properties.Name.title[0].plain_text;
    // 获取文章标签并去重
    const articleTags = article.properties.tags.multi_select.map((tag) => {
      if (!tags.includes(tag.name)) {
        tags = [...tags, tag.name];
      }
      return { name: tag.name, id: tag.id };
    });
    // 获取文章封面图链接，如果不存在则使用占位图
    const coverImage =
      article.properties?.coverImage?.files[0]?.file?.url ||
      article.properties.coverImage?.files[0]?.external?.url ||
      'https://via.placeholder.com/600x400.png';
    // 获取文章发布日期
    const publishedDate = article.properties.Published?.date?.start;
    // 获取文章摘要，如果不存在则使用默认摘要
    const summary =
      article.properties?.Summary.rich_text[0]?.plain_text ??
      '这是文章摘要，因为没有初始值所以你看到了这个摘要~~';
    // 获取文章公开状态
    const isPublic = article.properties?.Public.checkbox;
    // 返回转换后的文章格式
    return {
      title,
      tags: articleTags,
      coverImage,
      publishedDate,
      summary,
      isPublic,
    };
  });

  // 返回包含文章列表和标签列表的对象
  return { articles, tags };
};

/**
 * 根据传入的数据 `data` 和页面的 slug `slug`，返回一个匹配到的页面对象。
 * 如果没有匹配到，返回 undefined。
 * @param {Array} data - 包含页面数据的数组
 * @param {string} slug - 页面的 slug
 * @returns {Object|undefined} 匹配到的页面对象或 undefined
 */
export const getArticlePage = (data, slug) => {
  // 使用数组的 find() 方法找到第一个满足条件的页面对象
  const response = data.find((result) => {
    // 判断是否是页面对象
    if (result.object === 'page') {
      // 从页面对象中获取 slug 并转换为小写字母
      const resultSlug = slugify(
        result.properties.Name.title[0].plain_text,
      ).toLowerCase();
      // 判断页面的 slug 是否与目标 slug 相等
      return resultSlug === slug;
    }
    // 如果不是页面对象，返回 false
    return false;
  });

  // 返回匹配到的页面对象或 undefined
  return response;
};

