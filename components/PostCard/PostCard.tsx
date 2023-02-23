import Link from 'next/link';
import Image from '@/components/MDXComponents/Image';
import { formatDate } from '@/lib/formatDate';

const PostCard = (props) => {
  const { slug, title, description, updated_at, likes_count } = props;

  return (
    <Link
      href={`/blog/${slug}`}
      className="flex flex-col space-y-3 rounded-2xl border border-accent-2 p-6 transition-all duration-300 hover:scale-105 hover:bg-accent-1"
    >
      <Image
        src="/static/images/cover.png"
        width={1280}
        height={720}
        alt={title}
        rounded="rounded-lg"
      />

      <div className="flex-grow space-y-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="line-clamp-3 mt-4 text-accent-5 ">{description}</p>
      </div>

      <div className="flex items-center text-sm">
        {formatDate(updated_at)}
        &nbsp;/&nbsp;
        {`${likes_count} likes`}
        &nbsp;/&nbsp;
        {`9999 views`}
      </div>
    </Link>
  );
};

export default PostCard;
