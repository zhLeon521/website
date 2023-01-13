import Link from '../components/Link';
import SocialIcon from '../components/SocialIcon';
import { footerConfigs } from '../config/footer_links';

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${footerConfigs.socialLinks.email}`} />
          <SocialIcon kind="github" href={footerConfigs.socialLinks.github} />
          <SocialIcon kind="gitee" href={footerConfigs.socialLinks.facebook} />
        </div>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 transition-colors dark:text-gray-400">
          <div>{`Copyright © 2016 - ${new Date().getFullYear()}`}</div>
          <Link href="/">{footerConfigs.credit}</Link>
        </div>
      </div>
    </footer>
  );
}
