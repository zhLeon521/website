import Link from 'next/link';
import slugify from 'slugify';
import Image from 'next/image';

function Article(props) {
  // console.log(888, props);
  const { title, date, summary } = props;
  const slug = slugify(title).toLowerCase();

  return (
    <Link href={`/notion/${slug}`}>
      <article className="block" key={props.id}>
        <header className="">
          <h2 className="mb-2 mt-14 font-montserrat text-2xl font-black sm:text-3xl">
            {props.title}
          </h2>
          <small className=" text-s text-cyan-300">{props.date}</small>
        </header>
        <p className="mb-7 mt-2 font-montserrat text-lg text-text">
          {props.summary}
        </p>
      </article>
    </Link>
  );
}

export default Article;
