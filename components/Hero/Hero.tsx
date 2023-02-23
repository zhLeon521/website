import Link from '@/components/Link/Link';
import Image from '@/components/MDXComponents/Image';

// import { HERO_LINKS } from '@/config/links';

const Hero = () => {
  return (
    <div className="space-y-6 m-5 md:my-16">
      <div className="flex flex-col-reverse gap-8 md:flex-row md:justify-between">
        <div className="space-y-4 md:max-w-lg">
          <h1 className="text-4xl font-bold text-hong-fg">zhongleiyang</h1>
          <h2 className="text-lg font-medium text-accent-5">
            SZU Student • Full-stack Web Development Student
          </h2>
          <p className="text-lg">
            I am a student, currently learning web development skills such as
            Next.js, React.js, Tailwindcss, and database management. I can feel
            a sense of accomplishment when my code is recognized and
            appreciated.
          </p>
        </div>
        <div className="h-36 w-36">
          <Image
            src="/static/images/avatar.png"
            width={260}
            height={260}
            alt="小康"
            rounded="rounded-full"
            loading="eager"
            priority
          />
        </div>
      </div>
      {/* <div className="flex gap-6">
        {HERO_LINKS.map((link, i) => (
          <Link key={i} href={link.href} icon={false} animation={false}>
            {link.icon}
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default Hero;
