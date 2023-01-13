import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';

export default function Document() {
  return (
    <Html lang="en">
      <meta name="referrer" content="no-referrer" />
      <Head />
      <body className="overflow-x-hidden bg-white text-black antialiased transition-colors dark:bg-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
