import Footer from '@components/Footer';
import Header from '@components/Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <>
        <Header />
        <main className="container mx-auto mb-16 max-w-5xl px-2">
          {children}
        </main>
        <Footer />
      </>
    </div>
  );
};

export default Layout;
