import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import Hotjar from '@hotjar/browser';

const siteId = 3710371;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Cometa AI ChatBot</title>
        {/* <meta name="description" content="" /> */}
        <link rel="icon" type="image/x-icon" href="/cometa.ico" />
      </Head>
      <body suppressHydrationWarning={true}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
