import Footer from '@components/Footer';
import Header from '@components/Header';

type Props = {
  children: React.ReactNode;
};

const BlogListLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="container mx-auto mb-16 max-w-5xl px-2 pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BlogListLayout;
