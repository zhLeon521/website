import Link from 'next/link';
import slugify from 'slugify';
import Image from 'next/image';

function Article(props) {
  // console.log(888, props);
  const { title, date, summary } = props;
  const slug = slugify(title).toLowerCase();

  return (
    // <Link href={`/notion/${slug}`}>
    //   <div className="group">
    //     <Image
    //       className="rounded-xl group-hover:opacity-75"
    //       objectFit="cover"
    //       src={article.coverImage}
    //       placeholder="blur"
    //       blurDataURL={article.coverImage}
    //       width={684}
    //       height={800}
    //       layout="intrinsic"
    //       alt={'article cover'}
    //     />
    //     <div className="text-left w-full">
    //       <h3 className="mt-2 text-2xl">{article.title}</h3>
    //       {/* {JSON.stringify(article)} */}
    //       {/* <p>{article.summary}</p> */}
    //       <span className="text-base font-semibold flex items-center">
    //         {new Date(article.publishedDate).toLocaleDateString(
    //           siteMetadata.locale,
    //           {
    //             year: 'numeric',
    //             month: 'long',
    //             day: 'numeric',
    //           },
    //         )}
    //       </span>
    //     </div>
    //   </div>
    // </Link>
    11
  );
}

export default Article;
