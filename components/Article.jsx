import Link from 'next/link';
import slugify from 'slugify';


function Article(props) {
  const slug = slugify(props.title).toLowerCase();

  return (
    <Link href={`/notion/${slug}`}>
      <article className="block" key={props.title}>
          <h2 className="mb-2 mt-14 font-montserrat text-2xl font-black sm:text-3xl">
            {props.title}
          </h2>
          <small className=" text-s text-cyan-300">{props.date}</small>
        <p className="mb-7 mt-2 font-montserrat text-lg text-text">
          {props.summary}
        </p>
      </article>
    </Link>
  );
}

export default Article;
