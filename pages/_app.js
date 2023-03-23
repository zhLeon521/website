import { ThemeProvider } from 'next-themes';
import Layout from '@layout/Layout';
import '@styles/globals.css';
import '@styles/codeblock.css';

import Header from '@components/Header';
import Footer from '@components/Footer';

import { TrackScroll } from '@components/TrackScroll';
import { FloatMenu } from '@components/FloatMenu';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <FloatMenu />
      <TrackScroll />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
