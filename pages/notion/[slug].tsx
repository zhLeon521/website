/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';
import Image from 'next/image';
import { databaseId } from '.';
import { getDatabase, getArticlePage } from '../api/notion-api';
import Link from 'next/link';
// import { Text } from '../../components/Text';
// import Seo from '../../components/Seo';
import slugify from 'slugify';
import { Client } from '@notionhq/client';
import { formatDate } from '@lib/formatDate';

// import TableOfContents from '@components/TableOfContents/TableOfContents';
import { AnchorLink } from '@components/notionComponents/AnchorLink';
import { Callout } from '@components/notionComponents/Callout';
import { YoutubeEmbed } from '@components/notionComponents/YoutubeEmbed';
import { GetStaticPaths } from 'next';

export const Text = ({ text }) => {
  if (!text) {
    return null;
  }
  return text.map((value, index) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
    } = value;
    return (
      <span
        key={index}
        className={[
          bold ? 'font-bold' : null,
          italic ? 'font-fancy text-black dark:text-white' : null,
          code
            ? 'bg-indigo-200 dark:bg-indigo-900 dark:bg-opacity-50 text-indigo-500 dark:text-indigo-200 py-0.5 px-2 rounded mx-1 inline-block align-middle tracking-tight text-base font-mono'
            : null,
          strikethrough ? 'line-through' : null,
          underline ? 'underline' : null,
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
      </span>
    );
  });
};

const renderNestedList = (block) => {
  // Numbered lists not working\
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === 'numbered_list_item';

  return isNumberedList ? (
    <ol>{value.children.map((block) => renderBlocks(block))}</ol>
  ) : (
    <ul>{value.children.map((block) => renderBlocks(block))}</ul>
  );
};
export function renderBlocks(block) {
  const { type, id } = block;
  const value = block[type];

  // console.log(555657, id);
  // console.log(6666, value.text.plain_text);

  switch (type) {
    case 'paragraph':
      return (
        <p>
          <Text text={value.rich_text} />
        </p>
      );
    case 'heading_1':
      return (
        <h1
          className="text-accent group mb-10 mt-14 flex items-baseline text-2xl font-bold leading-10 lg:text-3xl"
          style={{ scrollMarginTop: '3rem' }}
        >
          <AnchorLink text={value.rich_text[0].plain_text}>
            <Text text={value.rich_text} />
          </AnchorLink>
        </h1>
      );
    case 'heading_2':
      return (
        <h2
          className="text-accent group mb-8 mt-14 flex items-baseline text-2xl font-bold leading-10 lg:text-3xl"
          style={{ scrollMarginTop: '3rem' }}
        >
          <AnchorLink text={value.rich_text[0].plain_text}>
            <Text text={value.rich_text} />
          </AnchorLink>
        </h2>
      );
    case 'heading_3':
      return (
        <h3
          className="text-accent group mb-4 mt-14 flex items-baseline text-2xl font-bold leading-tight"
          style={{ scrollMarginTop: '3rem' }}
        >
          <AnchorLink text={value.rich_text[0].plain_text}>
            <Text text={value.rich_text} />
          </AnchorLink>
        </h3>
      );
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.rich_text} />
          {value.children && renderNestedList(block)}
        </li>
      );

    case 'to_do':
      return (
        <div>
          <label
            htmlFor={id}
            className="flex items-center justify-start space-x-3"
          >
            <input
              id={id}
              aria-describedby={value.rich_text}
              name={id}
              type="checkbox"
              className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
            />
            <Text text={value.rich_text} />
          </label>
        </div>
      );
    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
          ))}
        </details>
      );
    case 'child_page':
      return <p>{value.title}</p>;
    case 'image':
      const src =
        value.type === 'external' ? value.external.url : value.file.url;
      const caption =
        value.caption.length >= 1 ? value.caption[0].plain_text : '';
      return (
        <figure className="mt-0">
          <Image
            className="rounded-xl"
            width={1200}
            height={684}
            alt={
              caption
                ? caption
                : 'A visual depiction of what is being written about'
            }
            src={src}
          />
          {caption && (
            <figcaption className="text-center">{caption}</figcaption>
          )}
        </figure>
      );
    case 'code':
      return (
        <pre className="m-3 whitespace-pre-wrap rounded-md bg-cyan-900 p-4 text-white">
          <code className="flex flex-wrap p-5" key={id}>
            {value.rich_text[0].plain_text}
          </code>
        </pre>
      );
    case 'callout':
      return (
        <Callout>
          {value.icon && <span>{value.icon.emoji}</span>}
          <div>
            <Text text={value.rich_text} />
          </div>
        </Callout>
      );
    case 'embed':
      const codePenEmbedKey = value.url.slice(value.url.lastIndexOf('/') + 1);
      return (
        <div>
          <iframe
            height="600"
            className="w-full"
            scrolling="no"
            title="Postage from Bag End"
            src={`https://codepen.io/braydoncoyer/embed/preview/${codePenEmbedKey}?default-tab=result`}
            frameBorder="no"
            loading="lazy"
            allowFullScreen={true}
          >
            See the Pen <a href={value.url}>Postage from Bag End</a> by Braydon
            Coyer (<a href="https://codepen.io/braydoncoyer">@braydoncoyer</a>)
            on <a href="https://codepen.io">CodePen</a>.
          </iframe>
        </div>
      );
    case 'table_of_contents':
      return <div>TOC</div>;
    case 'video':
      return <YoutubeEmbed url={value.external.url} />;
    case 'quote':
      return (
        <blockquote className="p-4 rounded-r-lg">
          <Text text={value.rich_text} />
        </blockquote>
      );
    case 'divider':
      return (
        <hr className="my-16 w-full border-none text-center h-10 before:content-['∿∿∿'] before:text-[#D1D5DB] before:text-2xl"></hr>
      );
    case 'file':
      const src_file =
        value.type === 'external' ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split('/');
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : '';
      return (
        <figure>
          <div className="flex items-center gap-2 rounded-md bg-blue-100 px-2 py-1">
            📎
            <Link href={src_file} passHref>
              <a className="font-medium underline">
                {lastElementInArray.split('?')[0]}
              </a>
            </Link>
          </div>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );

    case 'bookmark':
      const href = value.url;
      return (
        <a
          href={href}
          target="_brank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {href}
        </a>
      );
    default:
      return `❌ Unsupported block (${
        type === 'unsupported' ? 'unsupported by Notion API' : type
      })`;
  }
}

export default function Post({
  content,
  title,
  coverImage,
  slug,
  publishedDate,
  lastEditedAt,
  summary,
}) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        <article className="col-span-9 mt-12">
          <div className="space-y-12">
            <header className="font-inter mb-10 w-full">
              <h1 className="text-fore-primary mb-4 text-4xl font-extrabold lg:text-5xl">
                {title}
              </h1>
              <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                  <div className="flex items-center">
                    <time
                      className="ml-0 text-sm text-gray-700 dark:text-gray-300"
                      dateTime={publishedDate}
                    >
                      {formatDate(publishedDate)}
                    </time>
                  </div>
                </div>
              </div>
            </header>
            {content.map((block) => (
              <Fragment key={block.id}>{renderBlocks(block)}</Fragment>
            ))}
            {/* <Component components={components} /> */}
          </div>
        </article>
      </div>
    </>
  );
}

// 生成静态路径，用于 Next.js 预渲染
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = []; // 存放路径对象的数组
  const database: any = await getDatabase(databaseId); // 获取 Notion 数据库中的数据
  database.forEach((result) => {
    // 遍历数据库中的每一条数据
    if (result.object === 'page') {
      // 只处理 object 属性值为 page 的数据
      paths.push({
        // 将生成的路径对象加入到数组中
        params: {
          slug: slugify(
            // 将文章标题转换为 slug 形式
            result.properties.Name.title[0].plain_text,
          ).toLowerCase(),
        },
      });
    }
  });

  return {
    paths,
    fallback: 'blocking', // 设置 fallback 为 blocking，未生成的路径会暂时显示“生成中”，待生成后再显示页面内容
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  let content = []; // 初始化文章内容数组
  let articleTitle = ''; // 初始化文章标题
  let publishedDate = null; // 初始化文章发布日期
  let lastEditedAt = null; // 初始化文章最后编辑日期
  let coverImage = null; // 初始化文章封面图链接
  let summary = null; // 初始化文章摘要

  // 初始化 Notion 客户端
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  // 获取 Notion 数据库中的所有文章
  const data = await getDatabase(databaseId);

  // 通过 Slug 获取文章信息
  const page = getArticlePage(data, slug);
  // console.log(666, page);

  // 获取文章标题、发布日期、最后编辑日期、摘要和文章封面等信息
  articleTitle = page.properties.Name.title[0].plain_text;
  publishedDate = page.properties.Published.date.start;
  lastEditedAt = page.properties.LastEdited.last_edited_time;
  summary = page.properties.Summary?.rich_text[0]?.plain_text;
  coverImage =
    page.properties?.coverImage?.files[0]?.file?.url ||
    page.properties.coverImage?.files[0]?.external?.url ||
    'https://via.placeholder.com/600x400.png';

  // 获取文章内容
  let blocks = await notion.blocks.children.list({
    block_id: page.id,
  });
  content = [...blocks.results];

  // const tableOfContents = buildTableOfContents(content);
  // console.log(1, tableOfContents);
  // 如果文章内容过多，需通过分页获取所有内容
  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor,
    });
    content = [...content, ...blocks.results];
  }

  return {
    props: {
      content, // 返回文章内容数组
      title: articleTitle, // 返回文章标题
      publishedDate, // 返回文章发布日期
      lastEditedAt, // 返回文章最后编辑日期
      slug, // 返回文章 Slug
      coverImage, // 返回文章封面图链接
      summary, // 返回文章摘要
      // tableOfContents, //
    },
    revalidate: 30, // 每 30 秒进行一次缓存更新
  };
};
