import { ThemeProvider } from 'next-themes';
import Layout from '@layout/Layout';
import '@styles/globals.css';
import '@styles/codeblock.css';

import Header from '@components/Header';
import Footer from '@components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
