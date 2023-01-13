import { ThemeProvider } from 'next-themes';
import LayoutWrapper from '../components/LayoutWrapper';
import '../styles/globals.css';

import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
