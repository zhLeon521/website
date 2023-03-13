import Footer from '@components/Footer';
import Header from '@components/Header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (

    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container flex-grow max-w-screen-xl px-5 m-auto mt-16 sm:px-12 md:px-20">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
